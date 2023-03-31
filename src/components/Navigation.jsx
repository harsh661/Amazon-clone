import React, { useContext, useState } from 'react'
import {FaRegUser} from 'react-icons/fa'
import {CgShoppingCart, CgHome} from 'react-icons/cg'
import {MdOutlineMenu} from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../CartContext'

const Navigation = () => {
  const {user, cartItems} = useContext(CartContext)
  const[menu, setMenu] = useState(false)
  const active = 'text-dark-green border-t-4 border-dark-green flex flex-col gap-1 items-center py-1 relative px-2'
  const inactive = 'flex flex-col gap-1 items-center p-2 relative'
    
  return (
    <nav className='fixed flex flex-col lg:hidden bg-white bottom-0 w-full justify-around'>
      {menu &&
      <div className='h-20 w-full shadow-menu rounded-t-2xl'>

      </div>
      }
      <div className='flex w-full justify-around'>
          <NavLink onClick={()=>setMenu(false)} to='/' className={({ isActive }) => (isActive ? active : inactive)}>
            <CgHome size={25}/>
            <span className='text-xs'>Home</span>
          </NavLink>
          <NavLink onClick={()=>setMenu(false)} to={user?'/account':'/login'} className={({ isActive }) => (isActive ? active : inactive)}>
            <FaRegUser size={25}/>
            <span className='text-xs'>{user? 'You': 'Login'}</span>
          </NavLink>
          <NavLink onClick={()=>setMenu(false)} to='/cart' className={({ isActive }) => (isActive ? active : inactive)}>
            <CgShoppingCart size={25} />
            <span className='text-xs'>Cart</span>
            <span className='absolute text-[10px] bg-dark-green text-white px-1 top-1 right-1 rounded-full'>{cartItems?.length}</span>
          </NavLink>
          <NavLink to='/orders' onClick={()=>setMenu(prev => !prev)} className={({ isActive }) => (isActive ? active : inactive)}>
            <MdOutlineMenu size={25} />
            <span className='text-xs'>Menu</span>
          </NavLink>
      </div>
    </nav>
  )
}

export default Navigation