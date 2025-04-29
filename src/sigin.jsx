import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({  setEmail, setPassword, email, password }) => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    if (password.trim() === '' || email.trim() === '') {
      alert('ALL DETAILS SHOULD BE FILLED');
    } else {
      navigate('/home'); // Navigate without reloading the app
    }
  };

  return (
    <div className="h-screen w-full bg-blue-800 flex flex-col items-center justify-center">
      <div className="h-[450px] w-[450px] opacity-50 bg-white flex flex-col items-center justify-center">
        <p className="h-[70px] w-[450px] bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
          USER SIGN IN
        </p>
        <img
          className="object-contain h-[150px] w-[150px]"
          src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
          alt=""
        />
        <p className="text-xl">Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[40px] w-[400px] opacity-75 rounded-xl border-2 p-2 border-black m-2"
          type="email"
          autoComplete="off"
        />
        <p className="text-xl">Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-[40px] w-[400px] opacity-75 rounded-xl border-2 p-2 border-black m-2"
          type="password"
          autoComplete="off"
        />
        <button
          onClick={handleSignInClick}
          className="text-xl font-bold h-[50px] w-[400px] bg-blue-800 m-5 mb-2"
        >
          Sign In
        </button>
      </div>
      <div className="flex">
        <p className="text-xl font-bold p-5 pr-2">Have an Account:</p>
        <p
          onClick={() => navigate('/login')}
          className="text-blue-500 cursor-pointer font-bold p-5 pl-0 text-xl"
        >
          Login
        </p>
      </div>
    </div>
  );
};

export default SignIn;
