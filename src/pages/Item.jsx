import React, { useState, useEffect, useContext } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router';
import {ImStarFull} from 'react-icons/im'
import { MdLock } from 'react-icons/md'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import { CartContext } from '../CartContext';
import CurrencyFormat from '../components/CurrencyFormat';

const Item = () => {
  const navigate = useNavigate()
  const params = useParams()
  const {user, address, setCartItems} = useContext(CartContext)
  const[data, setData] = useState([])

  const getItem = async () => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
    .then(res=>res.json())
    .then(json=>{
      console.log(json)
      setData(json)})
  }

  const price = Math.round(data.price) * 80
  const rating = Math.round(data?.rating?.rate)

  const addToCart = () => {
    setCartItems(prev => (
      [...prev, {id: data.id, image:data.image, title: data.title, price: price}]
    ))
  }

  const buyNow = () => {
    addToCart()
    navigate('/cart')
  }

  useEffect(() => {
    getItem()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='min-h-screen w-full flex flex-col bg-white lg:pt-10 pb-14'>
        <div className='max-w-[1500px] w-full mx-auto flex flex-col lg:flex-row p-5 gap-5'>
            <div className='flex-1 h-max flex'>
                <img src={data.image} alt="cover-image" className='w-full h-full object-cover'/>
            </div>
            <div className='flex-1 flex flex-col'>
                {/* Heading */}
                <div className='flex lg:flex-col flex-col-reverse py-3'>
                    <h2 className='text-base sm:text-2xl'>{data.title}</h2>
                    <div className='flex py-1 items-center w-full justify-end gap-4 lg:justify-start'>
                        <span className='flex gap-1 text-orange-accent'>
                            {Array(rating || 0)
                            .fill()
                            .map((_, i) => (
                            <p key={i}><ImStarFull size={14}/></p>
                            ))}
                        </span>
                        <span className='text-xs text-link-blue'>{data?.rating?.count} ratings</span>
                    </div>
                </div>
                {/* Price area */}
                <div className='flex flex-col gap-2 py-3 border-y border-gray-border'>
                   <div className='flex gap-2'>
                      <span className='text-3xl font-light text-link-red'>-40%</span>
                      <span className='text-3xl font'><sup className='text-base font-normal'>₹</sup><CurrencyFormat value={(price)} /></span>
                   </div>
                   <span className='text-xs text-gray-text'>
                      M.R.P.:<s>₹{price + Math.round(40*price/100)}</s>
                   </span>
                   <span>
                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" className='w-16 py-1'/>
                        <p className='text-xs'>Inclusice of all taxes</p>
                   </span>
                </div>
                <div className='py-3 flex flex-col w-full gap-2 border-b border-gray-border'>
                  <div className='flex items-center gap-3'>
                    <div className='w-6 h-6 overflow-hidden relative'>
                      <img src="https://m.media-amazon.com/images/G/31/A2I_CEPC/VSX/vsx_sprite_2x.png" className='absolute -top-6'/>
                    </div>
                    <span className='text-sm font-semibold'>Offers</span>
                  </div>
                  <div className='w-full overflow-x-scroll p-3'>
                    <div className='flex w-min gap-2'>
                        <div className='flex flex-1 flex-col gap-2 shadow-card rounded-lg text-xs h-28 w-32 p-2 overflow-hidden'>
                          <b>No Cost EMI</b>
                          <span>
                            Upto ₹1,882.12 EMI interest savings on Amazon Pay ICICI Bank Credit Cards
                          </span>
                        </div>
                        <div className='flex flex-1 flex-col gap-2 shadow-card rounded-lg text-xs h-28 w-32 p-2 overflow-hidden'>
                          <b>Cashback</b>
                          <span>
                            ₹100 cashback & ₹500 welcome rewards on Amazon Pay Later
                          </span>
                        </div>
                        <div className='flex flex-1 flex-col gap-2 shadow-card rounded-lg text-xs h-28 w-32 p-2 overflow-hidden'>
                          <b>Bank Offers</b>
                          <span>
                            Upto ₹500.00 discount on select Credit Cards
                          </span>
                        </div>
                    </div>
                  </div>
                </div>

                <div className='hidden py-3 lg:flex gap-1 border-b border-gray-border'>
                  <span className='flex flex-1 flex-col items-center'>
                    <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png" className='rounded-full w-9'/>
                    <p className='lg:text-xs text-sm text-link-blue text-center'>Free delivery</p>
                  </span>
                  <span className='flex flex-1 flex-col items-center'>
                    <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png" className='rounded-full w-9'/>
                    <p className='lg:text-xs text-sm text-link-blue text-center'>Pay on delivery</p>
                  </span>
                  <span className='flex flex-1 flex-col items-center'>
                    <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png" className='rounded-full w-9'/>
                    <p className='lg:text-xs text-sm text-link-blue text-center'>7 days Replacement</p>
                  </span>
                  <span className='flex flex-1 flex-col items-center'>
                    <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png" className='rounded-full w-9'/>
                    <p className='lg:text-xs text-sm text-link-blue text-center'>Amazon Delivered</p>
                  </span>
                </div>
            </div>
            {/* Order area */}
            <div className='flex-1'>
                <div className='lg:border border-gray-border lg:p-4 rounded-md lg:w-min'>
                  <span className='lg:text-3xl text-xl font-semibold lg:font-normal flex items-center'>
                    <sup className='text-base hidden lg:flex pt-3'>₹</sup>
                    <span className='lg:hidden text-base lg:pt-3'>Total: ₹</span>
                    <CurrencyFormat value={price} />
                  </span>
                  <span>
                      <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" className='w-16 py-1'/>
                      <p className='text-sm'><span className='text-link-blue'>FREE delivery</span> <b>Wednesday, 5 April</b>. Order within <span className='text-success-green whitespace-nowrap'>12 hr 59 mins.</span></p>
                  </span>
                  {user && 
                    <div className='flex items-center gap-1 py-5 w-max'>
                        <span><HiOutlineLocationMarker /></span>
                        <span className='text-sm lg:text-xs text-link-blue'>Deliver to {user?.displayName} - {address.city} {address.pin}</span>
                    </div>
                  }
                  <span className='text-success-green'>In stock</span>
                  <p className='text-sm hidden lg:flex'>Shows what is inside. Item often ships in manufacturer container to reduce packaging. If this is a gift, consider shipping to a different address.</p>
                  <div className='flex flex-col gap-2 py-2'>
                    <button onClick={addToCart} className='w-full lg:w-52 flex items-center justify-center bg-yellow-main py-2 rounded-full lg:text-sm'>Add to Cart</button>
                    <button onClick={buyNow} className='flex items-center justify-center bg-orange-accent py-2 w-full rounded-full lg:text-sm'>Buy Now</button>
                  </div>
                  <div className='flex items-center gap-1 py-5'>
                      <span className='text-gray-main'><MdLock /></span>
                      <span className='text-sm lg:text-xs text-link-blue'>Secure transaction</span>
                  </div>
                  <span className='lg:text-xs'>Gift-wrap available</span>
                </div>
            </div>
            <div className='lg:hidden py-3 flex gap-1 border-y border-gray-border'>
              <span className='flex flex-1 flex-col items-center'>
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png" className='rounded-full w-9'/>
                <p className='lg:text-xs text-sm text-link-blue text-center'>Free delivery</p>
              </span>
              <span className='flex flex-1 flex-col items-center'>
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png" className='rounded-full w-9'/>
                <p className='lg:text-xs text-sm text-link-blue text-center'>Pay on delivery</p>
              </span>
              <span className='flex flex-1 flex-col items-center'>
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png" className='rounded-full w-9'/>
                <p className='lg:text-xs text-sm text-link-blue text-center'>7 days Replacement</p>
              </span>
              <span className='flex flex-1 flex-col items-center'>
                <img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png" className='rounded-full w-9'/>
                <p className='lg:text-xs text-sm text-link-blue text-center'>Amazon Delivered</p>
              </span>
            </div>
        </div>
        <div className='w-full h-52 p-5 mx-auto max-w-[1400px]'>
            <h2 className='font-bold text-xl lg:text-base lg:pt-5 lg:border-t'>Product description</h2>
            <p className='lg:p-3 pt-2'>{data?.description}</p>
        </div>
    </div>
  )
}

export default Item