import React, { useEffect, useState } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const kakaoKey = 'cf0017ef7df0c42df8c5659e810f7968'; // YOUR_APP_KEY를 발급받은 JavaScript 키로 변경
    if (window.Kakao) {
      try {
        window.Kakao.init(kakaoKey);
        console.log("Kakao SDK initialized:", window.Kakao.isInitialized()); // SDK 초기화 여부 확인
      } catch (error) {
        console.error("Kakao SDK initialization failed:", error);
      }
    } else {
      console.error("Kakao SDK not loaded.");
    }
  }, []);

  const loginWithKakao = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.login({
        success: function(authObj) {
          console.log("Login success:", authObj); // 로그인 성공 시 받은 토큰 등 정보
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: function(res) {
              console.log("User info:", res); // 사용자 정보
              setIsLoggedIn(true); //로그인 성공시 상태 업데이트
            },
            fail: function(error) {
              console.error("User info request failed:", error);
            }
          });
        },
        fail: function(err) {
          console.error("Login failed:", err); // 로그인 실패 시 에러
        }
      });
    } else {
      console.error("Kakao SDK or Auth module not loaded.");
    }
  };

  const logoutWithKakao = () => {
    if (window.Kakao && window.Kakao.Auth && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(function() {
        console.log('로그아웃 되었습니다.');
        setIsLoggedIn(false); //로그아웃 성공시 상태 업데이트
      });
    } else {
      console.error("Kakao SDK or Auth module not loaded, or not logged in.");
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Kakao Login with React</h1>
        <button className="kakao-login-btn" onClick={loginWithKakao}>카카오 로그인</button>
        <button className="kakao-logout-btn" onClick={logoutWithKakao}>카카오 로그아웃</button>
        {isLoggedIn ? <h1>로그인 성공</h1> : <h1>로그아웃 성공</h1>}
      </div>
    </ErrorBoundary>
  );
}

export default App;
