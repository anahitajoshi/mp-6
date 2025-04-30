import Link from 'next/link';

export default function Home() {
  // github authorize URL using the client id, redirect uri, scope according to gh website
  const gitURL = new URL('https://github.com/login/oauth/authorize');
  gitURL.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID!);
  gitURL.searchParams.set('redirect_uri', process.env.GITHUB_REDIRECT_URI!);
  gitURL.searchParams.set('scope', 'read:user user:email');

  // Link for the gitURL, change to string first
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full rounded-xl bg-white text-black max-w-sm  px-8 py-10">
        <h1 className="mb-4 text-3xl">mp-6: OAuth</h1>
        <h3 className="mb-6 text-lg font-medium">Sign in with GitHub below</h3>

        <Link
          href={gitURL.toString()}
          className="text-center text-base font-semibold text-white inline-block w-full rounded-md px-6 py-3 bg-emerald-700"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
