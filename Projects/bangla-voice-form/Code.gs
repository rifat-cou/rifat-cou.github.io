/**
 * ════════════════════════════════════════════════════════════════
 *  Bangla Speech Study — Google Apps Script Backend  (Code.gs)
 *
 *  Paste this entire file into script.google.com.
 *  Follow README.md for step-by-step deployment.
 * ════════════════════════════════════════════════════════════════
 */

// ── STEP A: Run createFolderAndSheet() once (see README) ────────
// ── STEP B: Paste the printed IDs below ────────────────────────
// DRIVE_FOLDER_ID should point at My Drive/Project/BanglaDialect/
// — createFolderAndSheet() below creates that path automatically
// and prints the ID to paste here.
const DRIVE_FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID';
const SHEET_ID        = 'YOUR_GOOGLE_SHEET_ID';
// ───────────────────────────────────────────────────────────────


/* ── doGet ─ health check (CORS-safe) ─────────────────────────── */
function doGet(e) {
  return json({ status:'ok', message:'Backend running.', time: new Date().toISOString() });
}


/* ── doPost ─ receives audio + metadata, saves to Drive + Sheet ── */
function doPost(e) {
  try {
    const p = JSON.parse(e.postData.contents);

    if (!p.speakerId || !p.audio || !p.filename)
      throw new Error('Missing required fields: speakerId, audio, filename');

    // 1. Decode base64 → validate it actually contains audio before saving.
    //    Catches truncated uploads / empty blobs instead of silently
    //    writing an unusable file to Drive.
    const bytes = Utilities.base64Decode(p.audio);
    if (!bytes || bytes.length < 1000) {
      throw new Error('Audio payload too small (' + (bytes ? bytes.length : 0) +
        ' bytes) — recording may be empty or corrupted. File was NOT saved.');
    }

    // 2. Save WAV to Drive folder, exactly as received — no re-encoding,
    //    no compression, no filtering. If a file with this exact name
    //    already exists (e.g. a retry after an unreadable no-cors
    //    response), suffix the new one instead of creating an ambiguous
    //    duplicate with the same visible name.
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const filename = uniqueFilename(folder, p.filename);
    const blob = Utilities.newBlob(bytes, 'audio/wav', filename);
    const file = folder.createFile(blob);
    const meta = p.metadata || {};
    file.setDescription(
      `Speaker:${p.speakerId} | Emotion:${p.emotion} | Dialect:${meta.dialect||'?'} | ${p.timestamp}`
    );

    // 3. Append row to Google Sheet
    const ss    = SpreadsheetApp.openById(SHEET_ID);
    let   sheet = ss.getSheetByName('Recordings');
    if (!sheet) {
      sheet = ss.insertSheet('Recordings');
      const hdr = sheet.getRange(1,1,1,13);
      hdr.setValues([[
        'Timestamp','Speaker ID','Emotion','Dialect','Age','Gender',
        'Education','Device','Environment','Sample Rate Hz',
        'File Name','Drive File ID','Drive Link'
      ]]);
      hdr.setFontWeight('bold').setBackground('#1A7A52').setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      p.timestamp,
      p.speakerId,
      p.emotion    || '',
      meta.dialect || '',
      meta.age     || '',
      meta.gender  || '',
      meta.education   || '',
      meta.device      || '',
      meta.environment || '',
      p.sampleRate || 16000,
      file.getName(),
      file.getId(),
      file.getUrl(),
    ]);

    Logger.log('✓ Saved: ' + file.getName());
    return json({ status:'ok', fileId:file.getId(), fileName:file.getName() });

  } catch (err) {
    Logger.log('✗ Error: ' + err.toString());
    return json({ status:'error', msg:err.toString() });
  }
}


/* ── Helper: return JSON response ─────────────────────────────── */
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
                       .setMimeType(ContentService.MimeType.JSON);
}

/* ── Helper: avoid ambiguous same-name duplicates in Drive ──────
   Drive happily allows two files with the identical name, which makes
   the folder confusing to audit. If p.filename is already taken, this
   appends _dup2, _dup3, … until it finds a free one. */
function uniqueFilename(folder, filename) {
  if (!folder.getFilesByName(filename).hasNext()) return filename;
  const dot  = filename.lastIndexOf('.');
  const base = dot === -1 ? filename : filename.slice(0, dot);
  const ext  = dot === -1 ? ''       : filename.slice(dot);
  let n = 2;
  let candidate;
  do {
    candidate = `${base}_dup${n}${ext}`;
    n++;
  } while (folder.getFilesByName(candidate).hasNext());
  return candidate;
}

/* ── Helper: find a subfolder by name, or create it ─────────────── */
function getOrCreateFolder(parent, name) {
  const existing = parent.getFoldersByName(name);
  return existing.hasNext() ? existing.next() : parent.createFolder(name);
}


/* ══════════════════════════════════════════════════════════════
   ONE-TIME SETUP HELPER
   Run this function ONCE from the Apps Script editor to create your
   Drive folder path (My Drive/Project/BanglaDialect/) and Google Sheet
   automatically. Safe to re-run — it reuses Project/BanglaDialect if
   they already exist instead of creating duplicates, though it will
   still create a new Sheet each time, so only paste fresh IDs if you
   mean to start a new log.

   How to run:
   1. Open script.google.com → paste this file → Save
   2. Select "createFolderAndSheet" from the function dropdown
   3. Click Run (▶) → authorise when prompted
   4. Open View → Logs to see the folder ID and sheet ID
   5. Paste those IDs into the constants at the top of this file
   6. Deploy as Web App (see README.md Step 4)
══════════════════════════════════════════════════════════════ */
function createFolderAndSheet() {
  const root          = DriveApp.getRootFolder();
  const projectFolder = getOrCreateFolder(root, 'Project');
  const studyFolder   = getOrCreateFolder(projectFolder, 'BanglaDialect');

  const ss     = SpreadsheetApp.create('📊 Bangla Speech Study — Log');
  const ssFile = DriveApp.getFileById(ss.getId());
  studyFolder.addFile(ssFile);   // file the Sheet inside Project/BanglaDialect/…
  root.removeFile(ssFile);       // …instead of leaving a copy at Drive root

  Logger.log('════════════════════════════════════════════');
  Logger.log('Recordings + Sheet both live in: My Drive/Project/BanglaDialect/');
  Logger.log('Folder ID  → ' + studyFolder.getId());
  Logger.log('Folder URL → ' + studyFolder.getUrl());
  Logger.log('Sheet ID   → ' + ss.getId());
  Logger.log('Sheet URL  → ' + ss.getUrl());
  Logger.log('');
  Logger.log('Paste into Code.gs:');
  Logger.log('const DRIVE_FOLDER_ID = "' + studyFolder.getId() + '";');
  Logger.log('const SHEET_ID        = "' + ss.getId() + '";');
  Logger.log('════════════════════════════════════════════');
}
