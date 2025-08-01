'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoggedIn = status === 'authenticated';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCredentialLogin = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMsg('Invalid username or password');
    } else {
      router.push('/'); // or your protected route
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {isLoggedIn ? `Welcome, ${session?.user?.name}` : 'Welcome Back'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isLoggedIn ? "You're logged in!" : 'Login to continue'}
        </p>

        {isLoggedIn ? (
          <button
            onClick={() => signOut()}
            className="w-full py-3 px-6 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-6">
              <button
                onClick={() => signIn('github')}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 text-white font-semibold bg-black rounded-lg hover:bg-gray-800 transition duration-300"
              >
                <FaGithub size={20} />
                Login with GitHub
              </button>

              <button
                onClick={() => signIn('google')}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
              >
                <FaGoogle size={20} />
                Login with Google
              </button>
            </div>

            {/* Credential Form */}
            <form
              onSubmit={handleCredentialLogin}
              className="space-y-4 text-left"
            >
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {errorMsg && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#ff6c03] hover:bg-black text-white font-semibold py-3 rounded-md transition duration-300"
              >
                Login with Credentials
              </button>
            </form>

            {/* Register Button */}
            <p className="text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => router.push('/register')}
                className="text-[#ff6c03] hover:text-black font-semibold underline transition duration-200 cursor-pointer"
              >
                Register here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
