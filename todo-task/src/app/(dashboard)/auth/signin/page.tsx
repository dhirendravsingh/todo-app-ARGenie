'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SigninPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async (e: any) => {
    e.preventDefault();
    await signIn('credentials', { username, password, callbackUrl: '/dashboard' });
  };

  return (
    <form onSubmit={handleSignin}>
      <input
      className='text-slate-950'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signin</button>
    </form>
  );
}
