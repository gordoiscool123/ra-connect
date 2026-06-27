# RA Connect (prototype)

RA Connect is a front-end-only prototype of a website that helps people with rheumatoid arthritis (RA) find specialists, message their care team, and connect with a peer community. It's built to be simple, calm, and accessible — and to be easy to upload to GitHub and publish for free with GitHub Pages.

**This is a demo, not a real product.** There is no real backend, no real doctors, and no real database. Sign-in is mocked, doctor profiles are fictional, and all messages/posts are stored only in your own browser's `localStorage`. Don't enter real personal or medical information into it.

## What's included

- **Sign-in / create-account page** (`index.html`) — mock authentication. Any email/password works; there's also a one-click "Continue as demo patient" option.
- **Searchable doctor directory** (`directory.html`) — 12 fictional specialist profiles you can search by name/keyword and filter by specialty, location, "accepting new patients," and "telehealth available." Each profile has a detail view with mock contact info (phone + email).
- **Patient–doctor messaging** (`messages.html`) — a two-pane chat interface. Conversations are seeded with sample messages, you can start new ones from the directory or from Messages directly, and sending a message triggers a short "typing…" indicator and a canned reply so the flow feels interactive.
- **Community board** (`community.html`) — six topic channels (Newly Diagnosed, Managing Flares, Medication Talk, Exercise & Mobility, Mental Health & Coping, Caregivers Corner) with seeded posts, the ability to post, reply, and like.
- **Accessible, low-stimulation design** — large tap targets (44px+ minimum), 18px base type in [Atkinson Hyperlegible](https://brailleinstitute.org/freefont) (a typeface designed for readability), visible keyboard focus states, semantic landmarks, skip-to-content link, and `prefers-reduced-motion` support — all chosen with RA patients (who may have joint pain, fatigue, or reduced hand dexterity) in mind.

No build step, no frameworks, no dependencies — just HTML, CSS, and vanilla JavaScript, so it runs anywhere, including GitHub Pages, with zero configuration.

## Project structure

```
ra-connect/
├── index.html          Sign in / create account (start here)
├── dashboard.html       Post-login home with quick links + recent activity
├── directory.html       Searchable specialist directory
├── messages.html        Patient–doctor messaging
├── community.html       Community channels and posts
├── css/
│   ├── styles.css       Design tokens + shared components (buttons, forms, cards…)
│   └── pages.css        Page-specific layouts (auth screen, chat panes, etc.)
├── js/
│   ├── data.js          Mock doctors, channels, seeded conversations/posts
│   ├── app.js            Shared auth guard, header/nav, logout, storage keys
│   ├── auth.js           Sign-in / create-account form logic
│   ├── dashboard.js       Dashboard activity panels
│   ├── directory.js       Search/filter logic + profile dialog
│   ├── messages.js        Chat list, sending messages, mock auto-replies
│   └── community.js       Channels, posting, replying, liking
├── LICENSE
├── .gitignore
└── README.md
```

## Try it locally first

Because the pages use `localStorage` and a couple of browser APIs that work best over `http://` rather than `file://`, run a quick local server instead of double-clicking `index.html`:

**Option A — Python (already installed on most Macs/Linux):**
```bash
cd ra-connect
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B — VS Code:** install the "Live Server" extension, open the `ra-connect` folder, right-click `index.html`, and choose "Open with Live Server."

Either way, click **Continue as demo patient** on the sign-in screen to jump straight in.

## Publishing it for free with GitHub Pages

You don't need any account other than a free GitHub account. There are two ways to get the files into a repository — pick whichever feels easier.

### Option 1: Using the GitHub website only (no command line)

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** icon in the top-right corner → **New repository**.
3. Name it something like `ra-connect`, set visibility to **Public**, and click **Create repository**. (Leave "Add a README" unchecked — you already have one.)
4. On the new repo's page, click **uploading an existing file** (or **Add file → Upload files**).
5. Drag the entire contents of the `ra-connect` folder into the upload area — make sure `index.html` ends up at the **root** of the repo, not inside a subfolder. You can upload the `css/` and `js/` folders by dragging them in as folders; GitHub preserves the structure.
6. Scroll down and click **Commit changes**.
7. Go to the repo's **Settings** tab → **Pages** (in the left sidebar).
8. Under "Build and deployment," set **Source** to **Deploy from a branch**, then set **Branch** to `main` and folder to `/ (root)`. Click **Save**.
9. Wait about a minute, then refresh the Pages settings screen — you'll see a banner with your live URL, something like:
   `https://your-username.github.io/ra-connect/`
10. Open that URL — your prototype is live and shareable.

### Option 2: Using Git from the command line

1. Install [Git](https://git-scm.com/downloads) if you don't already have it.
2. On GitHub, create a new **public** repository (same as steps 1–3 above), but this time **don't** upload any files yet — just create the empty repo and copy the URL it shows you (it'll look like `https://github.com/your-username/ra-connect.git`).
3. In your terminal:
   ```bash
   cd path/to/ra-connect
   git init
   git add .
   git commit -m "Initial commit: RA Connect prototype"
   git branch -M main
   git remote add origin https://github.com/your-username/ra-connect.git
   git push -u origin main
   ```
4. On GitHub, go to the repo's **Settings → Pages**, set **Source** to **Deploy from a branch**, **Branch** to `main`, folder `/ (root)`, then **Save**.
5. After a minute, your site will be live at:
   `https://your-username.github.io/ra-connect/`

### Updating the site later

- **Web upload:** repeat step 4–6 from Option 1 (Add file → Upload files → Commit). GitHub Pages redeploys automatically within a minute or two.
- **Git:** make your edits, then:
  ```bash
  git add .
  git commit -m "Describe what changed"
  git push
  ```

## Notes on the mock functionality

- **Auth:** `index.html` stores `{ name, email }` in `localStorage` under the key `raconnect_user` after "signing in." Every other page checks for that key and redirects back to `index.html` if it's missing — that's the entire "auth guard."
- **Messaging & community data:** seeded once per browser (see `ensureSeedData()` in `js/app.js`) and then read/written from `localStorage`. Clearing your browser's site data resets the demo back to its seeded state.
- **No real network calls:** nothing in this project sends data anywhere. It's safe to fork, extend, or hand to others as a fully self-contained demo.

## Ideas for extending this prototype

- Swap the mock auth for a real provider (e.g., Auth0, Firebase Auth, or a custom backend).
- Replace the `localStorage`-backed directory/messages/community with a real API and database.
- Add appointment booking/scheduling to the directory profiles.
- Add real-time messaging (e.g., WebSockets) once there's a backend.
