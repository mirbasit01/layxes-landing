# LAYXES storefront

Next.js storefront for the LAYXES Winter Drop.

## SEO and deployment

- Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS storefront origin before deployment. The current brand domain is `https://layxes.pk`.
- `/sitemap.xml` lists the homepage, product collections, sale collection, and product detail pages.
- `/robots.txt` points crawlers to the sitemap. Cart, checkout, wishlist, order confirmation, and search pages are marked `noindex`.
- Product pages publish Product and BreadcrumbList JSON-LD. The site publishes Organization and WebSite JSON-LD.

For local development, `http://localhost:8080` remains the app URL; canonical metadata uses the configured production domain.

## Customer sign-in

- Customer email sign-in uses Supabase Auth OTP. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in local and production environments.
- In Supabase Auth, configure the email sign-in template to include the six-digit `{{ .Token }}` code. The sign-in API keeps access and refresh tokens in HttpOnly cookies.
- Customer delivery details are saved to the signed-in user's Supabase Auth metadata at checkout. A local browser copy is kept to prefill checkout when the profile request is temporarily unavailable.
- `/terms` contains the LAYXES delivery, cancellation, and customer support terms.
