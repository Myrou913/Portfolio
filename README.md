# Mariem Sebai Portfolio

## Start locally

Run `npm install`, then `npm run dev`.

## Add real assets

- Add the exploded laptop video as `public/assets/laptop-exploded.mp4`.
- Add certificate images/PDF previews in `public/certificates/`, then populate the certificate data in `src/main.jsx`.
- Add demo videos in `public/demos/`, then give each project a video source in `src/main.jsx`.
- A portrait can be placed in `public/assets/portrait.jpg` when one is available.

## Secure contact delivery

The contact form intentionally contains no email-service credentials. Create a Formspree form (or replace it with your own server endpoint), then set `VITE_FORMSPREE_ENDPOINT` in a local `.env` file, for example:

`VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id`

The public comment area works as a browser-local preview until a database is connected. For public, cross-device comments, connect it to a protected backend (for example, a Supabase Edge Function with rate limiting and moderation) rather than exposing database keys in the browser.
