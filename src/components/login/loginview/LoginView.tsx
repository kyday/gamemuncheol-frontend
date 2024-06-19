'use client';

import Image from 'next/image';
import loginlogo from '@/assets/login/loginlogo.svg';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useLoginStore from '@/store/useMemberStore';
import { GoogleLogin, AppleLogin, UserAgree, Nickname } from '@/components/index';
import { useIsAgree } from '@/services/queries/member';
import { useCookies } from 'react-cookie';

export default function LoginView() {
  const router = useRouter();
  const params = useSearchParams();

  const accessToken = params.get('accessToken') || '';
  const refreshToken = params.get('refreshToken');
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

  //로그인 성공 여부
  const isLoggined = useLoginStore((state) => state.isLoggined);
  const setIsLoggined = useLoginStore((state) => state.setIsLoggined);

  // is-agreed api
  const { data: isAgreed, isLoading: isAgreedLoading } = useIsAgree(accessToken ? true : false);

  useEffect(() => {
    if (isLoggined) {
      if (!isAgreed) {
        router.push('/signup');
      } else {
        router.push('/main');
      }
    }
  }, [isAgreed]);

  // 로그인 성공 시
  useEffect(() => {
    if (accessToken && refreshToken) {
      setCookie('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
      setIsLoggined(true);
    }
  }, [params]);

  if (isAgreedLoading) {
    return <div className="body01R text-white">로딩 중.. 잠시만 기다려주세요</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Image width={360} height={200} priority src={loginlogo} placeholder="empty" alt="logo" />
      <div className="flex flex-col items-center gap-2.5">
        <div className="flex flex-col items-center">
          <div className="title01M text-white">정치질과 입롤에 지칠 때는</div>
          <div className="title01M text-white">112말고, 롤문철</div>
        </div>
        <div className="body02R text-white">로그인 후 이용하실 수 있습니다.</div>
      </div>

      <div className="flex flex-col gap-4">
        <AppleLogin />
        <GoogleLogin />
      </div>
    </div>
  );
}