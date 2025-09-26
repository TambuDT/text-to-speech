"use client"
import React, { useEffect, useState } from 'react'
import './login.css'
import { account, ID } from '../appwrite/appwrite'
import { useRouter } from 'next/navigation';
function LoginPage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
        router.push("/dashboard");
      } catch (error) {
        console.log("No user logged in");
      }
    };
    checkUser();
  }, [router]);


  const login = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession({
        email,
        password
      });
      setLoggedInUser(await account.get());
      //alert('Login successful!');
      router.push("/dashboard");
    }
    catch (error) {
      alert('Login failed: ' + error.message);
    }

  };

  return (
    <div className='login-container'>
      <label className='logo-text'>Benvenuto</label>
      <label className='login-text'>Inserisci le credenziali per l'accesso</label>

      <input
        className="input-field"
        type='email'
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input-field"
        type='password'
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='button' onClick={() => login(email, password)}>Login</button>

      <p className="footer-text">
        <label className='t2s-mini-logo'>T2S</label> Text-to-Speech
      </p>
    </div>
  );
}

export default LoginPage