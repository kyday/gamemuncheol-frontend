'use client';

import Image from 'next/image';
import loginlogo from '@/assets/login/loginlogo.svg';
import applelogo from '@/assets/login/apple.svg';
import GoogleLogin from '../googlelogin/Googlelogin';

import useLoginStore from '@/store/useLoginStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginView() {
  const router = useRouter();
  const params = useSearchParams();

  const accessToken = params.get('accessToken') || '';
  const refreshToken = params.get('refreshToken');

  //로그인 성공 여부
  const isLoggined = useLoginStore((state) => state.isLoggined);
  const setIsLoggined = useLoginStore((state) => state.setIsLoggined);

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsLoggined(true);
      router.push('/login');
    }
  }, [params]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-login-bg gap-6">
        <Image
          width={360}
          height={200}
          priority
          src={loginlogo}
          placeholder="empty"
          alt="logo"
        />
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex flex-col items-center">
            <div className="title01 text-white">정치질과 입롤에 지칠 때는</div>
            <div className="title01 text-white">112말고, 롤문철</div>
          </div>
          <div className="body02 text-white">
            로그인 후 이용하실 수 있습니다.
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-2.5 items-center bg-black800 py-2.5 px-5  w-[358px] h-[50px] rounded-[54px]">
            <Image
              width={20}
              height={20}
              priority
              src={applelogo}
              placeholder="empty"
              alt="apple"
            />
            <div className="body02 text-white">Apple로 계속하기</div>
          </div>
          <GoogleLogin />
        </div>
      </div>
    </>
  );
}
