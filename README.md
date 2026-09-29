# DIRA website

A standalone React + Vite product website. Anime.js 4 handles entrance, scroll, tab and control transitions. Official Metal FX and Voice Glow provide specialized effects. Screenshots are captured from the actual Windows app.

## Local preview
Install Node.js 22 or newer, then:
```sh
npm ci
npm run dev
```
Open http://127.0.0.1:4173. Use `npm run build` for production; output is `dist`.

## GitHub and Vercel
1. Create a public GitHub repository named `dira-website`.
2. Upload the CONTENTS of this source folder to the repository root. Ensure package.json is at the root. Include src, public, package-lock.json and vercel.json. Do not upload node_modules, dist, .env.local, or the installer into Git.
3. Open Releases → Draft a new release. Create tag `v0.1.0`, attach `DIRA_0.1.0_x64-setup.exe` and `SHA256SUMS.txt`, and publish.
4. Open Vercel → Add New → Project. Import the GitHub repository.
5. Select Vite. Root directory: `./`. Install command: `npm ci`. Build: `npm run build`. Output: `dist`.
6. Add environment variable `VITE_DOWNLOAD_URL` with the installer's actual GitHub Release download URL:
```
https://github.com/YOUR_USERNAME/dira-website/releases/download/v0.1.0/DIRA_0.1.0_x64-setup.exe
```
7. Deploy. Open the returned vercel.app URL and check the Windows download button. Changing the variable later requires Redeploy.
8. Optional: Project → Settings → Domains → Add your domain; use the DNS records Vercel shows.

The downloadable source archive omits the large executable. GitHub Releases hosts it separately. The ready-to-upload static archive includes it at downloads/ so a generic static server can serve everything together. Providers with per-file limits should use the GitHub Release URL and build this source instead.

## Privacy and limitations
The public site never connects to the local agent API. The optional microphone visualizer starts only on a click; audio is analyzed locally, not recorded or uploaded. Streams stop when switched off, scrolled off-screen, the tab is hidden, or the component unmounts. HTTPS is needed for browser microphone access.

Reduced motion disables decorative effects and choreography. Core text, navigation and downloads remain functional. WebGL and microphone failures have readable fallbacks.

This website does not promise unrestricted desktop automation. The FAQ lists the current supported tools and missing integrations. Keep that section accurate when releasing a new installer.

## References
- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [GitHub large files and release distribution](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [Anime.js timelines](https://animejs.com/documentation/timeline/)
- [Libraries.dev](https://libraries.dev/)

