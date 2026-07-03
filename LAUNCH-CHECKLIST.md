# Launch Checklist — Aboy Systems Portfolio

Work through this top to bottom before adding the site to Upwork, Fiverr, Freelancer, or LinkedIn.

## 1. Build check

- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` passes — every route listed as static/SSG
- [ ] `npm run start` and click through every page with the browser console open — no errors

## 2. Content & accuracy check

- [ ] Read `src/data/projects.ts` — every claim, metric, and feature matches the real builds (especially FieldOps numbers)
- [ ] `site.url` in `src/data/site.ts` is the real deployed domain (drives canonicals, OG URLs, sitemap)
- [ ] GitHub URL in `src/data/site.ts` is correct (currently guessed as `Avoy22`)
- [ ] Add LinkedIn/Upwork/Fiverr profile URLs in `site.socials` when ready (empty ones stay hidden)
- [ ] Add real `liveUrl` / `githubUrl` to projects when you're ready to publish them

## 3. Photo check

- [ ] `public/aboy-profile.jpg` added — real headshot, face visible, clean background
- [ ] No phone/email/WhatsApp text on the image; not AI-generated; no fake office/team photo
- [ ] Photo shows correctly on the homepage trust section and the About card (rebuild after adding)

## 4. PWA icon check

- [ ] `public/icon-192.png` (192×192) and `public/icon-512.png` (512×512) added
- [ ] `public/apple-touch-icon.png` (180×180) added
- [ ] `src/app/favicon.ico` replaced (it currently holds the default create-next-app icon)
- [ ] Icon design: near-black rounded square, white dashboard-card shapes, deep indigo accent, small chart mark
- [ ] Not used: AS monogram, initials, your face, marketplace logos, AI robot, dollar sign
- [ ] DevTools → Application → Manifest loads with no missing-icon warnings

## 5. Marketplace safety check

- [ ] Search the built site for your email and phone — zero results anywhere
- [ ] No contact form, WhatsApp, Telegram, Calendly, or payment links on any page
- [ ] No Upwork/Fiverr/Freelancer logos used anywhere on the site
- [ ] Footer shows the marketplace communication note
- [ ] `/faq` payment answer says platform-only; `/start` routes clients back to their platform
- [ ] No fake testimonials or client logos anywhere

## 6. Mobile check (real phone, not just DevTools)

- [ ] Navbar menu opens, closes, and closes after tapping a link
- [ ] Hero, dashboard mock, and project cards read well at 360–400px wide
- [ ] Tech stack grid, FAQ accordions, and /start checklists have no horizontal scroll
- [ ] Case study: sidebar content appears in a sensible order on mobile

## 7. Link check

- [ ] Click every navbar, footer, and card link on the deployed site — no 404s
- [ ] `/work/anything-invalid` shows the 404 page
- [ ] Footer service links scroll to the right card on /services without hiding under the navbar
- [ ] GitHub link opens your real profile

## 8. Deployment check

- [ ] Deployed on Vercel; production URL loads over HTTPS
- [ ] `https://<domain>/sitemap.xml` and `https://<domain>/robots.txt` respond
- [ ] Open Graph preview looks right (paste the URL into LinkedIn's post composer to test)
- [ ] Lighthouse quick pass: no accessibility or SEO flags you can't explain

## 9. Platform profile check

- [ ] Portfolio URL added to Upwork/Fiverr/Freelancer/LinkedIn profiles per each platform's rules
- [ ] Profile copy matches the site's positioning (dashboards, CRM systems, automation, business web apps)
- [ ] Profile links point to the live domain, not a preview URL
- [ ] GitHub profile email set to private if you want zero indirect contact paths
