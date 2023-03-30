import React, { useContext, useState, } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'
import {HiCheckCircle} from 'react-icons/hi'

const Items = ({items}) => {
  const {cartItems, setCartItems} = useContext(CartContext)
  
  const removeItem = () => { 
    setCartItems(cartItems.filter(item => item !== items))
  }

  return (
    <div className="flex lg:gap-10 h-full lg:p-5 border-b border-gray-border lg:flex-row flex-col">
      <div className="flex gap-5">
        <img src={items.image} alt="image" 
        className="h-48 lg:w-44 w-1/3 object-contain flex-1"
        />
        <div className='flex-[2] lg:hidden'>
          <h2 className='lg:text-xl text-base h-14 overflow-hidden py-2 lg:py-0 lg:pr-10'>{items.title}</h2>
          <span className='flex flex-col text-xs'>
            <p className='py-2 text-link-blue'>In stock</p>
            <p className='text-gray-text'>Eligible for FREE Shipping</p>
            <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" className='w-16 py-1' />
          </span>
          <div className='lg:text-lg text-2xl font-semibold'>
            ₹{items.price}
          </div>
        </div>
      </div>
      <div className='flex lg:flex-row flex-col flex-1 h-full justify-between'>
        <div className='flex flex-col justify-between'>
          <h2 className='text-xl lg:pr-10 hidden lg:block'>{items.title}</h2>
          <span className='lg:flex hidden flex-col text-xs pb-2'>
            <p className='py-2 text-link-blue'>In stock</p>
            <p className='text-gray-text'>Eligible for FREE Shipping</p>
            <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" className='w-16 py-1' />
          </span>
          <div className='gap-3 hidden lg:flex'>
            <div className='border flex bg-gray-accent p-1 rounded-md'>
              Qty: 1
            </div>
            <button onClick={removeItem} className='border flex bg-gray-accent p-1 rounded-md'>Remove from Cart</button>
          </div>
        </div>
        <div className='text-lg font-semibold hidden lg:flex'>
        ₹{items.price}
        </div>
      </div>
      <div className='flex gap-3 lg:hidden p-2'>
        <div className='border flex lg:bg-gray-accent p-1 rounded-md'>
          Qty: 1
        </div>
        <button onClick={removeItem} className='border flex lg:bg-gray-accent p-1 rounded-md'>Remove from Cart</button>
      </div>
    </div>
  )
}

const Cart = () => {

  const {setTotal, cartItems, total } = useContext(CartContext)
  let sum = 0
  cartItems?.map(item => item.price).forEach(item => sum += item)
  setTotal(sum)

  return (
    <div className={`${cartItems?.length !== 0 && 'lg:p-5'} bg-white lg:bg-inherit min-h-screen lg:min-h-unset lg:p-5 flex lg:flex-row flex-col-reverse gap-5 pb-20`}>
      <div className='flex flex-col bg-white flex-1'>
        <div className='flex flex-col p-5 border-t lg:border-none border-gray-border'>
          {cartItems?.length !== 0 && 
            <h2 className='text-3xl pb-5 lg:block hidden border-b border-gray-border'>Shopping Cart</h2>
          }
          {cartItems?.length !== 0 ?cartItems.map(items => (
            <Items key={items.id} items={items} />
          )): 
          <div className='flex items-center gap-3 lg:flex-col'>
            <div className='flex items-center justify-center lg:hidden rounded-full overflow-hidden bg-[#c9e7f2] w-24 h-24'>
              <img src="/cart.png" alt="cart" className='w-16 object-contain'/>
            </div>
            <h2 className='lg:text-3xl lg:p-5'>Your Amazon cart is empty!</h2>
            <p className='text-xs px-5 pb-5 max-w-3xl lg:block hidden'>
              Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.Continue shopping on the Amazon.in homepage, learn today's deals, or visit your Wish List.
            </p>
          </div>}
        </div>
        {cartItems?.length !== 0
        && <div className='lg:flex w-full items-center gap-1 pt-1 pb-5 pr-8 justify-end hidden'>
            <p className='text-xl'>Subtotal ({cartItems?.length} {cartItems.length == 1 ? 'item': 'items'}):</p> 
            ₹
            <span className='font-bold text-xl'>{total}</span>
          </div>
        }
      </div>
      {cartItems?.length !== 0 ?
      <div className='bg-white p-5 flex h-min flex-col gap-5'>
        <span className='text-success-green text-xs flex items-center gap-1'>
          <HiCheckCircle size={20}/>
          <p>Your order is eligible for FREE Delivery.</p>
        </span>
        <h2 className='text-lg'>Subtotal ({cartItems.length} items): <b>₹{sum}</b></h2>
        <Link to='/payment' className='flex items-center justify-center bg-yellow-main p-2 rounded-lg text-base lg:text-xs w-full'>Proceed to Buy</Link>
      </div>
      :
      <div className='w-[260px] flex h-min flex-col gap-5'></div>}
    </div>
  )
}

export default Cart