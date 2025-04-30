import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';

export default async function Profile() {
  // grab the cookie, then get the user data
  const cookie = await cookies();
  const data = cookie.get('user');

  // data could be undefined, go back to homepage
  if (!data) {
    return (
      <main className="h-screen flex flex-col items-center justify-center gap-4">
        <Link href="/" className="inline-block rounded border border-white bg-black px-4 py-2 text-sm font-medium text-white">Try to sign in again</Link>
      </main>
    );
  }

  const user = JSON.parse(data.value);
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl">GitHub user: {user.login}</h1>
      <Image src={user.profilepic} alt="Github user's profile picture" width={80} height={80} className="rounded-full" />
      {user.name && <p className="text-lg">Name: {user.name}</p>}
      {user.email && <p className="text-lg">Email: {user.email}</p>}
      <Link href="/" className="inline-block rounded border border-white bg-black px-4 py-2 text-sm font-medium text-white">Log out</Link>
    </main>
  );
}


