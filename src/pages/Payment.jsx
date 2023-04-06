import { useElements, useStripe, CardElement, } from '@stripe/react-stripe-js'
import React, { useContext, useState } from 'react'
import { MdLock } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { CartContext } from '../CartContext'
import CheckoutProducts from '../components/CheckoutProducts'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase"


const Payment = () => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const {cartItems, user, total, address} = useContext(CartContext)
  const [error, setError] = useState(null)
  const [disbled, setDisbled] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [success, setsuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
  }

  const handleChange = e => {
    setDisbled(e.empty)
    setError(e.error ? e.error.message : '')
  }

  const placeOrder = async () => {
    const docRef = await addDoc(collection(db, user?.email), {
      order: cartItems,
      orderDate: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id)

    setTimeout(() => {
      setProcessing(false)
      navigate('/success')
    }, 1000)
  }

  

  const today = new Date()
  const deliveryDay = new Date(today) 
  deliveryDay.setDate(today.getDate() + 3)
  const orderDate = today.toLocaleDateString('en-us', { weekday: 'short', month: 'short', day: 'numeric' })
  const deliveryDate = deliveryDay.toLocaleDateString('en-us', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className='min-h-screen w-full bg-white pb-20'>
      <div className='bg-header border-b border-gray-border'>
          <header className='flex items-center justify-between max-w-5xl p-3 mx-auto'>
              {/* <img src='/logo-dark.png' alt="amazon" className='w-28 py-5'/> */}
              <h2 className='text-3xl'>Checkout</h2>
              <span className='w-28 flex justify-end text-gray-main'><MdLock size={25} /></span>
          </header>
      </div>
      <div className='flex flex-col-reverse md:flex-row p-5 max-w-5xl mx-auto'>
        <div className='flex-[3]'>
          <div className='flex justify-between px-5 border-b border-gray-border p-5'>
            <div className='flex gap-5 flex-col md:flex-row'>
              <span className='text-lg font-semibold hidden md:block'>1</span>
              <span className='text-xl md:text-lg font-semibold'>Delivery address</span>
              <div className='flex flex-col gap-1 text-sm pl-5'>
                <span>{user?.displayName}</span>
                <span>{address?.street}</span>
                <span>{address?.city}, {address.pin}</span>
              </div>
            </div>
            <div className='text-sm text-link-blue'>change</div>
          </div>
          <div className='flex flex-col gap-3 px-5 border-b border-gray-border p-5'>
            <div className='flex justify-between'>
              <div className='flex gap-5 flex-col md:flex-row'>
                <span className='text-lg font-semibold hidden md:block'>2</span>
                <span className='text-xl md:text-lg font-semibold'>Payment method</span>
              </div>
              <div className='text-sm text-link-blue'>change</div>
            </div>
            <div className='flex flex-1'>
              <form className='p-5 border w-full flex flex-col gap-5'>
                <CardElement onChange={handleChange}/>
                <div className='flex w-full justify-end'>
                  <button 
                    className={`flex items-center text-xs justify-center p-2 ${processing ? 'bg-yellow-disabled text-gray-text': 'bg-yellow-main'}`}
                    disabled={processing || success}
                  >
                    <span>{processing ? 'Processing': 'Enter Card Details'}</span>
                  </button>
                </div>
              </form>
            </div>
            <div className='flex  gap-2 items-center'>
              <input onChange={()=>setDisbled(false)} type="checkbox" name="cod" id="cod"/>
              <span>Cash On Delivery</span>
            </div>
          </div>
          <div className='flex flex-col justify-between px-5 border-b border-gray-border p-5'>
            <div className='flex gap-5 flex-col md:flex-row'>
              <span className='text-lg font-semibold hidden md:block'>3</span>
              <span className='text-xl md:text-lg font-semibold'>Items and delivery</span>
              <div className='text-sm text-success-green font-bold'>Delivery date: {deliveryDate}</div>
            </div>
            <div className='lg:pl-40 py-2 flex flex-col gap-3 mb-5'>
              {cartItems.map(item => (
                <CheckoutProducts title={item.title} image={item.image}/>
              ))}
            </div>
            <div className='w-full px-5 border border-gray-border p-5 rounded-lg md:flex gap-3 items-center hidden'>
              <button 
                className={`flex items-center text-xs justify-center p-2 rounded-lg ${disbled ? 'bg-yellow-disabled text-gray-text': 'bg-yellow-main'}`}
                disabled={processing || disbled || success}
                onClick={placeOrder}
              >
                <span>{processing ? 'Processing': 'Place your order'}</span>
              </button>
              <div className='flex gap-2 text-lg text-link-red font-semibold'>
                <h2>Order Total:</h2>
                <span>{total !== 0 ? `₹${total + 40}` : '--'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='p-5 border border-gray-border rounded-lg mx-5'>
          <button 
            className={`flex items-center justify-center py-2 rounded-lg text-xs w-full ${disbled ? 'bg-yellow-disabled text-gray-text': 'bg-yellow-main'}`}
            disabled={processing || disbled || success}
            onClick={placeOrder}
          >
            <span>{processing ? 'Processing': 'Place your order'}</span>
          </button>
          <p className='text-xs text-center text-gray-text py-2'>By placing your order, you agree to Amazon's <br /> <a className='text-link-blue cursor-pointer hover:underline hover:text-link-red'>privacy notice</a> and <a className='text-link-blue cursor-pointer hover:underline hover:text-link-red'>conditions of use</a>.</p>
          <hr className='border-gray-border'/>
          <div>
            <h2 className='text-lg font-semibold py-2'>Order Summary</h2>
            <div className='flex flex-col gap-2 py-2'>
              <div className='flex justify-between text-xs'>
                <span>Items:</span>
                <span>{total !== 0 && `₹${total}`}</span>
              </div>
              <div className='flex justify-between text-xs'>
                <span>Delivery:</span>
                <span>₹40</span>
              </div>
            </div>
          </div>
          <hr className='border-gray-border'/>
          <div className='flex justify-between py-2 text-lg text-link-red font-semibold'>
            <h2>Order Total:</h2>
            <span>{total !== 0 ? `₹${total + 40}` : '--'}</span>
          </div>
          <hr className='border-gray-border'/>
        </div>
      </div>
      <div className='w-full px-5 md:hidden'>
        <button 
        className={`flex items-center justify-center py-2 rounded-lg w-full ${disbled ? 'bg-yellow-disabled text-gray-text': 'bg-yellow-main'}`}
        onClick={placeOrder}
        disabled={processing || disbled || success}
        >
          <span>{processing ? 'Processing': 'Place your order'}</span>
        </button>
      </div>
    </div>
  )
}

export default Payment