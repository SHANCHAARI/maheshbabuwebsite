# 🚀 How to Deploy Your Website

You are ready to share **The Mahesh Cinematic Universe** with the world! Follow these simple steps to put your website online for free.

## Phase 1: Push to GitHub
Since I have already saved your code locally, you just need to put it on GitHub.

1.  **Log in to GitHub**: Go to [github.com](https://github.com) and log in.
2.  **Create a New Repository**:
    *   Click the **+** icon in the top right -> **New repository**.
    *   Repository name: `mahesh-cinematic-universe` (or anything you like).
    *   **Public/Private**: Public is easier, but Private works too.
    *   **Click "Create repository"**.
3.  **Connect & Push**:
    *   You will see a screen with commands. Copy the lines under **"…or push an existing repository from the command line"**.
    *   It will look like this (copy and paste this into your terminal here):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/mahesh-cinematic-universe.git
    git branch -M main
    git push -u origin main
    ```
    *(Replace `YOUR_USERNAME` with your actual GitHub username)*

## Phase 2: Deploy to Vercel (Recommended)
Vercel is the best place to host React apps for free.

1.  Go to [vercel.com](https://vercel.com) and **Sign Up / Login** with **GitHub**.
2.  On your dashboard, click **"Add New..."** -> **"Project"**.
3.  You will see your list of GitHub repositories. found `mahesh-cinematic-universe` and click **"Import"**.
4.  **Configure Project**:
    *   **Framework**: It should auto-detect "Vite".
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
5.  Click **"Deploy"**.

Wait about 1 minute. Vercel will build your site and give you a live link (e.g., `mahesh-universe.vercel.app`) that you can share with your friends!

## Alternative: Netlify
If you prefer Netlify:
1.  Go to [netlify.com](https://netlify.com).
2.  Click **"Add new site"** -> **"Import from existing project"**.
3.  Choose **GitHub**.
4.  Select your repo.
5.  Click **"Deploy"**.

---
**🎉 Done! Your website is now live on the internet.**
