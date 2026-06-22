# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ad46cb59-bda7-4a4a-af61-38b69dc1f8ae

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ad46cb59-bda7-4a4a-af61-38b69dc1f8ae) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### GitHub Pages

This repo is wired up to deploy to GitHub Pages automatically. The live site is:

**https://chivnerd.github.io/diamond-play-visualizer/**

How it works:

- The workflow at `.github/workflows/deploy.yml` builds the app and publishes
  `dist/` to Pages on every push to `main` (and can be run manually from the
  Actions tab via "Run workflow").
- `vite.config.ts` sets `base` to `/diamond-play-visualizer/` for production
  builds so assets resolve under the project-page subpath, and
  `src/App.tsx` passes that base to the router via `basename`.
- `public/404.html` provides an SPA fallback so deep links and page refreshes
  resolve to the app instead of a Pages 404.

One-time setup (only needed once, by a repo admin): go to
**Settings → Pages → Build and deployment** and set **Source** to
**"GitHub Actions"**. After that, merging to `main` publishes the site.

### Lovable

Alternatively, open [Lovable](https://lovable.dev/projects/ad46cb59-bda7-4a4a-af61-38b69dc1f8ae) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
