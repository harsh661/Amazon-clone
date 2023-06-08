import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {MdSearch} from 'react-icons/md'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import { CartContext } from '../CartContext'
import {RiMicLine} from 'react-icons/ri'

const Header = () => {
  const {cartItems, user, address} = useContext(CartContext)
  const [category, setCategory] = useState([])
  const getCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=> {
                setCategory(json)
            })
  }
  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
    <div className='lg:bg-dark-primary lg:from-transparent bg-gradient-to-r from-phone-blue to-phone-green w-full flex items-center py-2 lg:py-0 px-4 gap-5'>
        <Link to='/' className='hidden lg:flex'>
            <img src="/logo.svg" alt="logo" className='w-36'/>
        </Link>
        { address && 
        <Link to='/account' className='items-end text-white hidden lg:flex'>
        <HiOutlineLocationMarker size={18}/>
        <div className='flex flex-col h-[34px]'>
            <span className='text-xs whitespace-nowrap'>Deliver to {user?.displayName || 'Guest'}</span>
            <span className='text-sm font-semibold whitespace-nowrap'>
                {address && <span>{address?.city} {address?.pin}</span>}
            </span>
        </div>
        </Link>
        }
        <div className='flex flex-row-reverse lg:flex-row rounded-md overflow-hidden w-full h-10 lg:border-none lg:shadow-none shadow-md border border-gray-border'>
            <input size={0} type="text" placeholder='Search Amazon.in' className='w-full lg:p-3'/>
            <button className='bg-white lg:bg-yellow-accent p-2 flex items-center justify-center'>
                <MdSearch size={30}/>
            </button>
        </div>
        <RiMicLine size={30} className='lg:hidden'/>
        <div className='flex-col text-white p-2 hidden lg:flex'>
            <span className='text-xs whitespace-nowrap'>Hello {user? user?.displayName: 'Guest'}</span>
            {!user ?
            <Link to='/login'>
            <span className='text-sm font-semibold whitespace-nowrap'>Sign in</span>
            </Link>
            :<Link to={user?'/account':'/login'}>
                <span className='text-sm cursor-pointer font-semibold whitespace-nowrap'>Account & Lists</span>
            </Link>
            }
        </div>
        <Link to='/orders' className='flex-col text-white p-2 hidden lg:flex'>
            <span className='text-xs whitespace-nowrap'>Returns</span>
            <span className='text-sm font-semibold whitespace-nowrap'>& Orders</span>
        </Link>
        <Link to='/cart' className='text-white p-2 relative hidden lg:flex'>
            <div className='flex w-max'>
                <img src="/cart_logo.svg" alt="cart" className='w-10'/>
                <div className='text-sm font-semibold flex items-end'>Cart</div>
            </div>
            <span className='absolute left-7 top-0 text-orange-accent font-bold'>{cartItems?cartItems?.length:0}</span>
        </Link>
    </div>
    <div className='bg-light-green lg:hidden lg:bg-dark-secondary p-3 flex items-center gap-2 lg:text-white text-sm'>
        <HiOutlineLocationMarker size={18}/>
        {user? `Deliver to ${user?.displayName}`: 'You are not signed in'}
    </div>
    <div className='bg-light-green hidden lg:bg-dark-secondary py-1 px-5 lg:flex items-center gap-5 lg:text-white text-sm'>
            <Link to='/' className='hover:outline outline-1 p-2 cursor-pointer'>All</Link>
        {category.map((elem, i) => (
            <Link to={`/category/${elem}`} key={i} className='hover:outline outline-1 p-2 cursor-pointer'>{elem.charAt(0).toUpperCase() + elem.slice(1)}</Link>
        ))}
    </div>
    </>
  )
}

export default Header