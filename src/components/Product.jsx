import React, { useContext, useEffect, useState } from 'react'
import {ImStarFull} from 'react-icons/im'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext'

const Product = ({id, image, rating, title, price}) => {
  const {setCartItems} = useContext(CartContext)

  const [isAdded, setIsAdded] = useState(false)

  const addToCart = () => {
    setCartItems(prev => (
      [...prev, {id, image, title, price}]
    ))
    setIsAdded(true)
  }

  return (
    <div className='flex flex-col p-3 justify-between bg-white'>
      <Link to={`product/${title.replace(/\//g, "")}`} className='flex flex-col overflow-hidden pb-1'>
        <img src={image} alt="product" 
        className='h-40 lg:h-72 object-contain md:pb-10 pb-3'
        />
        <h2 className='md:text-sm text-base md:whitespace-normal whitespace-nowrap'>{title}</h2>
      </Link>
      <div className='overflow-hidden flex flex-col gap-2'>
          <div className='flex gap-1 text-orange-accent'>
            {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}><ImStarFull size={12}/></p>
            ))}
          </div>
          <div className='flex flex-col gap-3'>
            <span>
              <sup className='text-base'>₹</sup>
            <span className='text-xl lg:text-2xl'>
                {price}
            </span>
              <sup>00</sup>
            </span>
            {
              isAdded 
              ? <Link 
                to='/cart'
                className='flex items-center justify-center bg-orange-accent p-2 rounded-lg text-xs w-full'>Buy Now
                </Link>
              : <button 
                onClick={addToCart}
                className='flex items-center justify-center bg-yellow-main p-2 rounded-lg text-xs w-full'>Add to Cart
                </button>
            }
          </div>
      </div>
    </div>
  )
}

export default Product