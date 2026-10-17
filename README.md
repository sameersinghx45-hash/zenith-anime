# Zenith Anime

A beginner-friendly, responsive anime catalogue demo built with plain HTML, CSS and JavaScript. It includes search, genre filters, anime cards, episode detail pages, and a watchlist stored in the browser.

## Files
- `index.html` — page structure
- `style.css` — purple/dark responsive design
- `script.js` — sample catalogue data and interactions

## Run it on Android
1. Download and extract `zenith-anime.zip`.
2. Open `index.html` in a browser to test the static page (some file-browser/browser combinations restrict local storage; hosting it is more reliable).
3. To edit from your phone, use a text/code editor app or an online editor that lets you create and upload the three files.

## Free static hosting with GitHub Pages
1. Sign in at https://github.com/ and create a new public repository named `zenith-anime`.
2. Upload `index.html`, `style.css`, `script.js`, and this README to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under build/deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for the published URL shown in Pages settings. Open it on your phone and test search, episode pages, and watchlist.
6. If the page does not update, refresh after a minute or check the repository's Actions/Pages status.

GitHub Pages is for static files. This demo does not have a backend, accounts, cloud sync, or its own streaming service. The watchlist is stored locally in the browser and may not follow you to another device.

## Add content safely
- The included titles are fictional demo entries; the score values are illustrative, not real ratings.
- Replace sample entries in `script.js` with titles and descriptions you are allowed to publish.
- Use artwork you own, have permission to use, or that is clearly licensed for your intended use. Do not hotlink copyrighted posters without permission.
- By default, `videoUrls` is an empty array. Only add direct HTTPS/HTTP video URLs you own or have explicit rights to stream. A public page is not permission to rebroadcast an anime.
- The video element accepts direct video file URLs (such as an authorized MP4). Many streaming services do not provide a public direct video URL; use their permitted embed or official link according to their terms. The placeholder is intentional.

## Customize video URLs
Inside an anime object in `script.js`, you can set a direct video URL for each episode, for example:

```js
videoUrls: [
  "https://your-domain.example/authorized-episode-1.mp4",
  "https://your-domain.example/authorized-episode-2.mp4"
]
```

Use a real URL only if you own the file or have permission to stream it. The number at each position corresponds to the episode index.

## Current limitations
- No login, server database, cloud watchlist, admin dashboard, subtitles management, or payment system.
- Search and watchlist work in the browser.
- Episode buttons are a demo list; episode titles are sample text.
- For a real public streaming service, use licensed content and a hosting provider whose bandwidth and content rules fit the project.
