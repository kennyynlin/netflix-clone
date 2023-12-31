import { useCallback, useState } from 'react';
import Input from '@/components/Input';
import axios from 'axios';
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const router  = useRouter();

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      }).then(() => {
        router.push('/profiles');
      }).catch((error) => {
        throw new Error(error);
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      }).then(() => {
        login();
      }).catch((error) => {
        throw new Error(error);
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full  w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className=' h-full w-full bg-black lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='Logo' className='h-12'></img>
        </nav>
        <div className='flex justify-center'>
          <div className='mt-2 w-full self-center rounded-md bg-black bg-opacity-70 px-16 py-16 lg:w-2/5 lg:max-w-md'>
            <h2 className='mb-8 text-4xl font-semibold text-white'>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  id={'name'}
                  onChange={(e: any) => setName(e.target.value)}
                  value={name}
                  label={'Username'}
                />
              )}
              <Input
                id={'email'}
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
                label={'Email'}
                type='email'
              />
              <Input
                id={'password'}
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                label={'Password'}
                type='password'
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className='mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700'
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className='mt-8 flex flex-row items-center justify-center gap-4'>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80'
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80'
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className='mt-12 text-neutral-500'>
              {variant === 'login'
                ? 'First time using netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='cursor-pointer text-white hover:underline'
              >
                {variant === 'login' ? 'Create and account? ' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
