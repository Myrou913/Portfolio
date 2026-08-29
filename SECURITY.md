# Deployment notes

Set `VITE_FORMSPREE_ENDPOINT` in your host's environment settings to enable private contact email delivery. Do not commit credentials or email-provider API keys.

The public comments shown on this static site are local to each visitor's browser. For shared public comments, use a server-side API with validation, rate limiting, moderation, and protected database credentials.
