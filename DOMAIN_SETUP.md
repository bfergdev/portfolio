# Custom Domain Setup: bferguson.design

## GitHub Pages Configuration

A `CNAME` file has been added to the `public` folder with the domain `bferguson.design`. This file will be automatically copied to the deployment during the build process.

## Cloudflare DNS Configuration

To point your domain to GitHub Pages, configure the following DNS records in your Cloudflare dashboard:

### DNS Records

1. **A Records** (for apex domain `bferguson.design`):
   - Type: `A`
   - Name: `@`
   - Content: `185.199.108.153`
   - Proxy status: DNS only (gray cloud)

   Add three more A records with the same settings but different IPs:
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. **CNAME Record** (for www subdomain):
   - Type: `CNAME`
   - Name: `www`
   - Content: `bfergdev.github.io`
   - Proxy status: DNS only (gray cloud)

### Important Notes

- **Proxy Status**: Keep the proxy status as "DNS only" (gray cloud icon) initially. Once everything is working, you can enable Cloudflare's proxy (orange cloud) for additional features.
- **SSL/TLS**: In Cloudflare, set SSL/TLS encryption mode to "Full" or "Full (strict)" under SSL/TLS settings.

## GitHub Repository Settings

After DNS is configured, update your GitHub repository settings:

1. Go to: `https://github.com/bfergdev/portfolio/settings/pages`
2. Under "Custom domain", enter: `bferguson.design`
3. Click "Save"
4. Wait for DNS check to complete (may take a few minutes)
5. Once verified, check "Enforce HTTPS"

## Verification

After configuration (DNS propagation can take up to 48 hours, but usually 15-30 minutes):

1. Visit `https://bferguson.design` - should load your site
2. Visit `https://www.bferguson.design` - should redirect to main domain
3. Verify HTTPS is working (green padlock in browser)

## Current Deployment

- **Old URL**: https://bfergdev.github.io/portfolio/
- **New URL**: https://bferguson.design (once configured)

Both URLs will continue to work, but the custom domain will be the primary URL.
