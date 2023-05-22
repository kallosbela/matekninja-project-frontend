const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
const googleClientId = "822244209556-ot5dnerigu5skj1o29hj6kpfiu9jo980.apps.googleusercontent.com"
// const redirectUri = "https://coral-app-rbarg.ondigitalocean.app/callback"
const redirectUri = "http://localhost:5173/callback"
const scope = "openid%20profile%20email"
const prompt = "consent"

export const googleUrl = `${rootUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=${prompt}`