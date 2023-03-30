import React from 'react'

const CheckoutProducts = ({title, image}) => {
  return (
    <div className='flex'>
        <img src={image} alt="image" className='w-20 object-cover'/>
        <span className='text-xs pl-2'>{title}</span>
    </div>
  )
}

export default CheckoutProducts