import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate()
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[displayName, setDisplayName] = useState('')
  const[error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password, displayName)
      .then((userCredential) => {
        console.log(userCredential)
        navigate('/')
      })
      .catch((error) => {
        setError(true)
      });
  }
  const register = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password, displayName)
      .then((userCredential) => {
        if (userCredential) {
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return (
    <div className='w-full bg-white min-h-screen flex justify-center'>
        <div className='flex flex-col items-center'>
        <img src="/logo-dark.png" alt="amazon" className='w-28 m-3'/>
        <div className='border border-gray-300 p-5 flex flex-col gap-3'>
            <h2 className='text-2xl font-medium'>Sign in</h2>
            <form className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <span className='text-xs font-bold'>Name</span>
                    <input 
                        className='border border-gray-400 p-1 rounded-sm' 
                        type="text" 
                        name="pass" 
                        id="pass"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)} 
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs font-bold'>Email</span>
                    <input 
                        className='border border-gray-400 p-1 rounded-sm' 
                        type="email" 
                        name="mail" 
                        id="mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='text-xs font-bold'>Password</span>
                    <input 
                        className='border border-gray-400 p-1 rounded-sm' 
                        type="password" 
                        name="pass" 
                        id="pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                {error && <p>Wrong Credentials</p>}
                <button type='submit' onClick={submit} className='flex items-center justify-center bg-gradient-to-b from-yellow-main to-yellow-accent p-2 text-xs w-full rounded-sm border border-gray-400'>Sign in</button>
            </form>
            <p className='text-xs'>By continuing, you agree to Amazon's Conditions of <br/> Use and Privacy Notice.</p>
        </div>
        <button onClick={register} className='w-full p-1 text-sm mt-5 border border-gray-500 rounded-sm bg-gray-accent'>Create your amazon account</button>
        </div>
    </div>
  )
}

export default Login