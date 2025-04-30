import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  // code needed for the redirect URI
  const code = req.nextUrl.searchParams.get('code');

  // if there's no code, just go back to the homepage
  if (!code) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // code for the token
  // fetch URL given by github -- endpoint 
  const githubToken = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST', headers: { Accept: 'application/json' },
    body: new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI!,
    }),
  }).then(r => r.json()); // turn the fetch response into JS obj


  // user's profile
  const githubUser = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${githubToken.access_token}` },
  }).then(r => r.json());  // turn the fetch response into JS obj

  // put in cookie for that session.
  //redirect to the /loggedin (loggedin page.tsx)
  const nextResponse = NextResponse.redirect(new URL('/loggedin', req.url));
  nextResponse.cookies.set(
    'user',
    // JS obj that has the info into JSON string so it can be stored in the cookie 
    JSON.stringify({
      login: githubUser.login,
      profilepic: githubUser.avatar_url,
      name: githubUser.name,
    }),
  );
  return nextResponse;
}


