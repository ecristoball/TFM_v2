

// environment.ts
export const environment = {
  production: false,
  apiUrl: window.location.hostname.includes('netlify.app')
    ? 'https://tfmv2back-production.up.railway.app/api'
    : 'http://127.0.0.1:8000/api'
};
