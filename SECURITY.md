# Security notes

- Never put API keys or other secrets in browser-side code or Vite `define` values.
- Store provider API keys in server-side environment variables only, and access them from trusted server functions.
- If a key was previously exposed in a public build or repository history, revoke and rotate it with the provider.
- Keep `.env*` files out of version control; commit only `.env.example` with placeholders.
- Review dependency audit findings before production deployment.
