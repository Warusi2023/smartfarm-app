# SmartFarm – Paid Ads Integration & Deployment Narrative

This document is a practical narrative you can paste into **Cursor** as `README-ads.md`, commit to GitHub, and use for deployments (backend on **Railway**, frontend on **Netlify**). It explains the ad strategy, the minimal code you'll add, environment variables, and CI/CD steps.

---

## 1) Goal & Strategy

SmartFarm will monetize with **display/native ads** and **affiliate placements** that are relevant to farmers (seeds, tools, irrigation, livestock, etc.). We start with:

* **Google AdSense** for simple display ads.
* **Affiliate banner/cards** (e.g., Amazon or agri‑suppliers) that you control via config.

Both can be toggled **on/off** via environment variables per environment (dev, preview, prod).

---

## 2) Frontend Integration (Netlify)

> Replace code paths to match your framework. Examples shown with React/Vite.

### 2.1 Create an Ads provider

**`/frontend/src/lib/ads.ts`**

```ts
export function loadAdSense(clientId: string) {
  if (!clientId) return;
  const id = "adsbygoogle-script";
  if (document.getElementById(id)) return; // avoid duplicates
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
}
```

### 2.2 Simple AdSense component

**`/frontend/src/components/AdBox.tsx`**

```tsx
import { useEffect } from "react";
import { loadAdSense } from "../lib/ads";

const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
const adsEnabled = import.meta.env.VITE_ADSENSE_ENABLED === "true";

export default function AdBox() {
  useEffect(() => {
    if (adsEnabled) loadAdSense(clientId);
  }, []);

  if (!adsEnabled) return null;
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot="auto"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
```

> Place `<AdBox />` sparingly (e.g., dashboard sidebar, below articles). Keep UX first.

### 2.3 Affiliate card component (optional)

**`/frontend/src/components/AffiliateCard.tsx`**

```tsx
interface Props {
  title: string;
  imgUrl: string;
  link: string; // your affiliate link
}

export default function AffiliateCard({ title, imgUrl, link }: Props) {
  const enabled = import.meta.env.VITE_AFFILIATE_ENABLED === "true";
  if (!enabled) return null;
  return (
    <a href={link} target="_blank" rel="sponsored noopener noreferrer" className="block rounded-2xl shadow p-4">
      <img src={imgUrl} alt={title} className="w-full h-40 object-cover rounded-xl" />
      <div className="mt-3 font-medium">{title}</div>
      <div className="text-sm opacity-70">Sponsored</div>
    </a>
  );
}
```

### 2.4 Content Security Policy (CSP)

Add a CSP that allows Google ad domains **only in production**. On Netlify, create a **`_headers`** file in `/frontend/dist` (or configure in `netlify.toml`). Minimal example:

**`/frontend/public/_headers`** (copied to build output)

```
/*
  Content-Security-Policy: default-src 'self'; img-src 'self' https://*.ggpht.com https://*.googleusercontent.com https://*.googlesyndication.com data:; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagservices.com; frame-src https://*.google.com https://*.doubleclick.net; connect-src 'self'; style-src 'self' 'unsafe-inline';
```

Tailor to your stack and tighten where possible.

---

## 3) Backend Touches (Railway / Express)

Your backend doesn't have to serve ads, but it can provide **feature flags** and **affiliate config** to the frontend.

**`/backend/src/routes/ads.ts`**

```ts
import { Router } from "express";

const router = Router();

router.get("/config", (_req, res) => {
  res.json({
    adsenseEnabled: process.env.ADSENSE_ENABLED === "true",
    affiliateEnabled: process.env.AFFILIATE_ENABLED === "true",
    affiliateTag: process.env.AFFILIATE_TAG || "",
  });
});

export default router;
```

Wire it in your server:

```ts
import ads from "./routes/ads";
app.use("/ads", ads);
```

---

## 4) Environment Variables

Create a `.env.example` in repo root:

```
# Frontend
VITE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_ENABLED=false
VITE_AFFILIATE_ENABLED=false
VITE_AFFILIATE_TAG=

# Backend
ADSENSE_ENABLED=false
AFFILIATE_ENABLED=false
AFFILIATE_TAG=

# CI/Deploy (only in your CI provider / local dev, never commit real values)
NETLIFY_SITE_ID=
NETLIFY_AUTH_TOKEN=
RAILWAY_TOKEN=
```

> Do **not** commit real tokens. Add `.env` to `.gitignore`.

---

## 5) Local Dev in Cursor

```
# from repo root
cp .env.example .env
# set your local values if needed

# run frontend
cd frontend && npm i && npm run dev

# run backend
cd ../backend && npm i && npm run dev
```

---

## 6) GitHub Flow

```
# in Cursor terminal
git checkout -b feature/ads
# add files and code above
git add .
git commit -m "feat(ads): AdSense + affiliate scaffolding, env + docs"
git push -u origin feature/ads
```

Open a PR and merge when ready.

---

## 7) Deploy Frontend to Netlify

1. In Netlify, connect the repo (or use existing project).
2. **Build settings** (adjust for your stack):

   * Build command: `npm run build`
   * Publish directory: `dist` (Vite) or `build` (CRA).
3. **Environment variables (Project → Environment variables)**:

   * `VITE_ADSENSE_CLIENT_ID` (from AdSense)
   * `VITE_ADSENSE_ENABLED=true` (toggle)
   * `VITE_AFFILIATE_ENABLED=true` (if using)
   * `VITE_AFFILIATE_TAG=your-tag` (if applicable)
4. Deploy. Use **Deploy Previews** to test before production.

> If you're using Netlify CLI in CI, it will need `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` in the CI environment.

---

## 8) Deploy Backend to Railway

1. Create/Select a Railway project and **Deploy from GitHub** (backend folder).
2. Set environment variables in Railway → **Variables**:

   * `ADSENSE_ENABLED`, `AFFILIATE_ENABLED`, `AFFILIATE_TAG`.
3. Redeploy.

> If you automate CLI deploys, use `RAILWAY_TOKEN` in CI only.

---

## 9) QA Checklist

* [ ] Pages render with no ads in **dev** by default.
* [ ] In **preview/prod**, AdSense boxes appear where `<AdBox />` is placed.
* [ ] Affiliate links use `rel="sponsored noopener noreferrer"` and open in new tab.
* [ ] CSP allows required ad domains; console shows no CSP violations.
* [ ] Core Web Vitals remain acceptable (limit ad slots per page).

---

## 10) Policy & Privacy Notes

* Comply with **AdSense policies**, especially on content and ad density.
* Provide a **Privacy Policy** and, where required, a **cookie/consent banner**.
* Mark affiliate UI as **"Sponsored"** or **"Affiliate link."**

---

## 11) Future Enhancements

* Server‑driven placement via `/ads/config` (A/B testing).
* Frequency capping and lazy‑loading ad components.
* A simple sponsors page for direct partner logos.

---

**Done.** Commit this file, add the components, set env vars, and you're ready to push to GitHub and deploy: backend on Railway, frontend on Netlify.
