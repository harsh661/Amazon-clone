import React, { useContext, useState } from 'react'
import { CartContext } from '../CartContext'
import { signOut } from 'firebase/auth'
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { updateProfile, updatePassword, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 


const Account = () => {
  const {user, address} = useContext(CartContext)
  
  const[name, setName] = useState(user?.displayName)
  const[mail, setMail] = useState(user?.email)
  const[pass, setPass] = useState('')
  const[street, setStreet] = useState(address.street)
  const[city, setCity] = useState(address.city)
  const[pin, setPin] = useState(address.pin)

  const navigate = useNavigate()
  const signout = () => {
    signOut(auth).then(() => {
        navigate('/')
      }).catch((error) => {
        console.log(error)
      });
  }
  const changeMail = () => {
    updateEmail(auth.currentUser, mail).then(() => {
        navigate('/')
      }).catch((error) => {
        console.error(error)
      });
  }
  const changePass = () => {
    updatePassword(auth.currentUser, pass).then(() => {
        navigate('/')
      }).catch((error) => {
        console.error(error)
      });
  }
  
  const changeName = () => {
    updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        navigate('/')
      }).catch((error) => {
        console.error(error)
      });
  }
  const changeAddress = async (e) => {
    e.preventDefault()
    await setDoc(doc(db, 'users', user.email), {
      address: {
        street: street,
        city: city,
        pin: pin,
      }
    })
    navigate('/')
  }

  return (
    <div className='w-full min-h-screen bg-white'>
        <div className='max-w-4xl mx-auto p-5 flex flex-col gap-5 text-sm'>
            <h2 className='text-3xl'>Login & Security</h2>
            <div className='flex flex-col border border-gray-border'>
                <div className='flex p-4 justify-between items-center border-b border-gray-border'>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Name:</span>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <button onClick={changeName} className='py-1 px-5 border border-gray-border bg-gray-accent'>Edit</button>
                </div>
                <div className='flex p-4 justify-between items-center border-b border-gray-border'>
                    <div className='flex flex-col'>
                        <span className='font-bold'>E-mail:</span>
                        <input type="text" value={mail} onChange={(e) => setMail(e.target.value)}/>
                    </div>
                    <button onClick={changeMail} className='py-1 px-5 border border-gray-border bg-gray-accent'>Edit</button>
                </div>
                <div className='flex p-4 justify-between items-center border-b border-gray-border'>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Password:</span>
                        <input type="text" value={pass} placeholder='*********' onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    <button onClick={changePass} className='py-1 px-5 border border-gray-border bg-gray-accent'>Edit</button>
                </div>
                <form onSubmit={changeAddress} className='flex p-4 justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Address:</span>
                        <div className='flex gap-3 flex-wrap pt-2'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="street">Street</label>
                                <input value={street} onChange={e => setStreet(e.target.value)} type="text" id='street' className='p-1 border'/>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="city">City</label>
                                <input value={city} onChange={e => setCity(e.target.value)} type="text" id='city' className='p-1 border'/>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="pin">Pin Code</label>
                                <input value={pin} onChange={e => setPin(e.target.value)} type="text" id='pin' className='p-1 border'/>
                            </div>
                        </div>
                    </div>
                    <button  className='py-1 px-5 border border-gray-border bg-gray-accent'>Edit</button>
                </form>
            </div>
            <div>
                <button onClick={signout} className='items-center justify-center text-base bg-orange-accent px-3 py-2 rounded-lg'>Sign Out</button>
            </div>
        </div>
    </div>
  )
}

export default Account