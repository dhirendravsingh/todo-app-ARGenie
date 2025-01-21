'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e : any) => {
    e.preventDefault();
    try {
      await axios.post('/api/user', { username, password });
      router.push('/auth/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
      className='text-slate-950'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
            className='text-slate-950'

        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}
