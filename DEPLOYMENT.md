# Deploying to GitHub Pages (Free!)

This portfolio is configured to automatically deploy to GitHub Pages for free hosting.

## Setup Instructions

### 1. Create a GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Game developer portfolio"
```

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. That's it! The workflow will automatically deploy on every push to `main`

### 3. Access Your Live Site

After the first push, GitHub Actions will build and deploy your site automatically.

Your portfolio will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

You can find the exact URL in:
- Repository → **Settings** → **Pages**
- Or in the **Actions** tab after deployment completes

## How It Works

The `.github/workflows/deploy.yml` file automatically:
1. Installs dependencies
2. Builds your portfolio (`npm run build`)
3. Deploys the `dist` folder to GitHub Pages

## Updating Your Portfolio

Just push changes to the `main` branch:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

GitHub Actions will automatically rebuild and redeploy your site!

## Custom Domain (Optional)

Want to use your own domain? 

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

## Troubleshooting

**Site not loading?**
- Check the Actions tab for build errors
- Ensure GitHub Pages is enabled in repository settings
- Wait a few minutes after first deployment

**Images not showing?**
- Make sure image paths are relative (already configured)
- Check that images are in the `public` folder or imported in components

**404 on refresh?**
- This is normal for single-page apps on GitHub Pages
- The current setup handles this correctly

## Cost

**100% FREE!** 
- GitHub Pages is free for public repositories
- Unlimited bandwidth for reasonable use
- Custom domain support included
