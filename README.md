# LAYXES storefront

Next.js storefront for the LAYXES Winter Drop.

## SEO and deployment

- Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS storefront origin before deployment. The current brand domain is `https://layxes.pk`.
- `/sitemap.xml` lists the homepage, product collections, sale collection, and product detail pages.
- `/robots.txt` points crawlers to the sitemap. Cart, checkout, wishlist, order confirmation, and search pages are marked `noindex`.
- Product pages publish Product and BreadcrumbList JSON-LD. The site publishes Organization and WebSite JSON-LD.

For local development, `http://localhost:8080` remains the app URL; canonical metadata uses the configured production domain.
