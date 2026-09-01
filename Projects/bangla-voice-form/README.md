# 🎙️ Bangla Speech Study — Voice Recording Form

A free, self-hosted voice data collection form.  
**No paid services. No accounts for participants.**

---

## How it works (architecture)

```
Participant's browser (GitHub Pages)
    │
    │  1. Records WAV audio with RecordRTC.js
    │  2. Converts to base64
    │  3. POST → text/plain body
    ▼
Google Apps Script Web App (free serverless backend)
    │
    │  4. Decodes base64 → saves .wav to your Drive folder
    │  5. Appends a log row to your Google Sheet
    ▼
Your Google Drive folder   +   Your Google Sheet
```

---

## File structure

```
bangla-voice-form/
├── index.html     ← The complete form (all HTML + CSS + JS)
├── Code.gs        ← Google Apps Script backend
└── README.md      ← This file
```

---

## Full Setup Guide

### Step 1 — Create a Google Drive folder

1. Go to [drive.google.com](https://drive.google.com)
2. Click **+ New → Folder**
3. Name it: `Bangla Speech Study — Recordings`
4. Open the folder → look at the URL bar:
   ```
   https://drive.google.com/drive/folders/1ABC...XYZ
   ```
5. Copy the folder ID (the part after `/folders/`):
   ```
   1ABC...XYZ
   ```
   *(Keep this — you will need it in Step 3)*

---

### Step 2 — Create a Google Sheet (for the metadata log)

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **Blank spreadsheet**
3. Name it: `Bangla Speech Study — Log`
4. Look at the URL bar:
   ```
   https://docs.google.com/spreadsheets/d/1DEF...PQR/edit
   ```
5. Copy the sheet ID (the part after `/d/`):
   ```
   1DEF...PQR
   ```
   *(Keep this — you will need it in Step 3)*

---

### Step 3 — Set up Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **+ New project**
3. Delete everything in the default `Code.gs` file
4. Open the `Code.gs` file from this folder and **paste the entire contents**
5. Paste your IDs from Steps 1 and 2 at the top:
   ```javascript
   const DRIVE_FOLDER_ID = '1ABC...XYZ';   // ← your folder ID
   const SHEET_ID        = '1DEF...PQR';   // ← your sheet ID
   ```
6. Click 💾 **Save** (Ctrl+S)

> **Optional shortcut:** Instead of Steps 1 & 2, you can run the
> `createFolderAndSheet()` helper function in Apps Script to create
> the folder and sheet automatically. See the comment in `Code.gs`.

---

### Step 4 — Deploy the Apps Script as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**
2. Click the gear icon ⚙ next to "Select type" → choose **Web app**
3. Set the options:
   | Field | Value |
   |---|---|
   | Description | `Bangla Speech Study v1` |
   | Execute as | **Me** (your Google account) |
   | Who has access | **Anyone** |
4. Click **Deploy**
5. When prompted, click **Authorize access** → sign in with your Google account → click Allow
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfyc.../exec
   ```
   *(This is the most important step — keep this URL safe)*

> **Note:** Every time you edit Code.gs and want to update the live version,
> go to Deploy → Manage deployments → click the pencil icon → select
> "New version" → Deploy.

---

### Step 5 — Add the URL to your form

1. Open `index.html` in a text editor
2. Find this line near the top of the `<script>` section:
   ```javascript
   const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` with your actual URL:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
   ```
4. Save `index.html`

---

### Step 6 — Deploy to GitHub Pages

1. Create a free account at [github.com](https://github.com) if you do not have one
2. Create a **new repository** (click + → New repository)
   - Repository name: `bangla-speech-study` (or any name you like)
   - Visibility: **Public** *(required for free GitHub Pages)*
   - Click **Create repository**
3. Upload your files:
   - Click **uploading an existing file** (or use drag-and-drop)
   - Upload `index.html` — that is the only file needed
   - Click **Commit changes**
4. Enable GitHub Pages:
   - Go to your repository → **Settings** tab
   - In the left menu, click **Pages**
   - Under "Source", select **Deploy from a branch**
   - Branch: **main** | Folder: **/ (root)**
   - Click **Save**
5. Wait 1–2 minutes, then your form is live at:
   ```
   https://YOUR-GITHUB-USERNAME.github.io/bangla-speech-study/
   ```

---

### Step 7 — Test the complete flow

**Before sharing with participants, do one full test yourself:**

1. Open your GitHub Pages URL
2. On the landing screen, click **"Test connection"**
   - You should see a green ✓ and "Connected — server is ready"
   - If you see ✗, the Apps Script URL is wrong or not deployed yet
3. Fill in the metadata form
4. Record all 10 sentences (you can record gibberish for testing)
5. Check your **Google Drive folder** — you should see 10 `.wav` files
6. Check your **Google Sheet** — you should see 10 rows of metadata
7. Delete the test files before sharing with real participants

---

## Understanding your data

### Google Drive folder

Each submitted recording is saved as a `.wav` file named:
```
{SPEAKER_ID}_{NUMBER}_{EMOTION}.wav
```

Example:
```
DHK_M5X7_01_neutral.wav
DHK_M5X7_02_angry.wav
DHK_M5X7_03_happy.wav
...
```

The speaker ID is auto-generated from the dialect prefix + timestamp:
- `DHK` → Dhaka Standard
- `CHI` → Chittagong
- `SYL` → Sylheti

### Google Sheet columns

| Column | Contents |
|---|---|
| Timestamp | ISO 8601 date-time of the recording |
| Speaker ID | Auto-generated participant ID |
| Emotion | Emotion label (neutral, angry, happy, …) |
| Dialect | Native dialect selected by participant |
| Age | Age range (18–25, 26–35, …) |
| Gender | Gender selection |
| Education | Education level |
| Device | Recording device type |
| Environment | Recording environment |
| Sample Rate Hz | 16000 (default) |
| File Name | WAV filename |
| Drive File ID | Google Drive file ID (for programmatic access) |
| Drive Link | Direct link to open the file in Drive |

### Audio specifications

| Property | Value |
|---|---|
| Format | WAV (PCM 16-bit) |
| Channels | Mono |
| Sample rate | 16,000 Hz (change `SAMPLE_RATE` in index.html) |
| Typical file size | 150–400 KB per 5–10 second recording |

To change sample rate to research-grade 44,100 Hz:
```javascript
// In index.html, line near top of <script>:
const SAMPLE_RATE = 44100;   // change from 16000
```

---

## Troubleshooting

**"Test connection" shows ✗**
- Check that you pasted the correct Apps Script URL in `index.html`
- Check that the Apps Script is deployed with "Who has access: Anyone"
- Re-deploy: Apps Script editor → Deploy → Manage deployments → New version

**Microphone access denied**
- Chrome/Edge: Click the lock icon in the address bar → Allow microphone
- Firefox: Allow when prompted by the browser
- iOS Safari: Settings → Safari → Microphone → Allow

**Files not appearing in Google Drive**
- The form uses `mode: 'no-cors'` which means the browser cannot read the server response
- If the test connection passed, uploads are reaching the server — check Drive again after 30 seconds
- Check Apps Script logs: Apps Script editor → View → Logs (Execution log)

**Recording sounds distorted on iOS**
- RecordRTC's StereoAudioRecorder has known limitations on older iOS versions
- Recommended: use Chrome on Android or Chrome/Edge on desktop for best quality

**Sheet shows no headers / rows not in right columns**
- The sheet is created automatically on the first upload
- Make sure the sheet is blank before the first real submission

**"Cannot read properties of null"**
- The RecordRTC CDN link may be blocked on some networks
- Download RecordRTC.js and host it in the same GitHub repo:
  ```
  bangla-voice-form/
  ├── index.html
  ├── RecordRTC.min.js     ← download from cdnjs.cloudflare.com
  └── Code.gs
  ```
  Then change the script tag in index.html:
  ```html
  <script src="RecordRTC.min.js"></script>
  ```

---

## Customising the form

**Change sentences:**
Edit the `EMOTIONS` array in `index.html`. Each entry has:
```javascript
{ id:'neutral',
  en:'Neutral',             // emotion name (English)
  bn:'আজকে আবহাওয়া…',    // Bangla sentence (displayed in Georgian serif)
  tr:'The weather is…',     // English translation (small text below)
  tip:'Calm, flat voice…'   // acting instruction shown to participant
}
```

**Change study name:**
Search and replace `Bangla Speech Study` in `index.html`.

**Add more dialects to the dropdown:**
Find the `<select id="f-dialect">` section in `index.html` and add `<option>` tags.

**Remove the connection test:**
Delete the `<!-- Connection test -->` block from the landing screen HTML.

---

## Cost summary

| Service | Cost |
|---|---|
| GitHub Pages hosting | Free (unlimited for public repos) |
| Google Apps Script | Free (6 min/execution, 20,000 calls/day) |
| Google Drive storage | Free (15 GB included) |
| Google Sheets | Free |
| RecordRTC CDN | Free (cdnjs.cloudflare.com) |
| **Total** | **$0** |

At ~300 KB per WAV file, 15 GB of Drive storage holds roughly 50,000 recordings.

---

## Sharing with participants

Once deployed and tested, share the link:
```
https://YOUR-USERNAME.github.io/bangla-speech-study/
```

The form works on:
- ✅ Chrome (desktop + Android) — best quality
- ✅ Firefox (desktop)
- ✅ Edge (desktop)
- ✅ Safari (iOS 14.3+) — good quality
- ❌ In-app browsers (Facebook, WhatsApp) — ask participants to open in Chrome

---

*Built for the Bangla Regional Dialect & Emotional Speech Research Project, Comilla University.*
