import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'

const OrderCompletion = () => {
  const {setCartItems, user, total, address} = useContext(CartContext)

  const today = new Date()
  const deliveryDay = new Date(today) 
  deliveryDay.setDate(today.getDate() + 3)
  const deliveryDate = deliveryDay.toLocaleDateString('en-us', { weekday: 'short', month: 'short', day: 'numeric' })
  
  useEffect(() => {
    window.scrollTo(0, 0)
    setCartItems([])
  }, [])

  return (
    <div className='h-screen bg-white lg:bg-inherit w-full flex justify-center'>
      <div className='max-w-screen-xl flex-1 bg-white flex flex-col lg:px-20 lg:py-10'>
        <header className='w-full lg:flex justify-between p-5 hidden'>
          <img src="/logo-dark.png" alt="logo" className='w-24 lg:w-32'/>
          <span className='font-semibold'>Order Confirmation</span>
        </header>
        <header className='flex items-center justify-center lg:hidden font-bold text-2xl text-success-green mt-5'>Order Placed</header>
        <div className='p-5 flex flex-col gap-5'>
          <h2 className='text-xl text-orange-accent font-semibold'>{user?.displayName}</h2>
          <p className='text-lg'>
            Thank You for shopping with us. We will send you a confirmation once you order ships.
          </p>
          <h2 className='text-xl text-orange-accent font-semibold'>Details</h2>
          <span className='font-bold'>Order total: ₹{total}</span>
        </div>
        <div className='flex justify-between bg-gray-accent px-5 py-1 border-t-4'> 
          <div className='flex flex-1 flex-col gap-2'>
            <span className='text-xl'>Arriving</span>
            <span className='text-success-green font-semibold'>{deliveryDate}</span>
          </div>
          <div className='flex-1 px-1 mb-2 flex flex-col text-sm'>
            <span className='text-xl'>Ship to</span>
            <span className='font-bold'>{user?.displayName}</span>
            <span className='font-bold'>{address?.street}</span>
            <span className='font-bold'>{address?.city}</span>
            <span className='font-bold'>{address?.pin}</span>
          </div>
        </div>
        <h3 className='text-center mt-1'>We hope to see you again.</h3>
        <Link to='/' className='p-3 flex items-center justify-center rounded-lg bg-yellow-accent mx-20 mt-2'>Back to Home</Link>
      </div>
    </div>
  )
}

export default OrderCompletion