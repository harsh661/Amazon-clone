import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase'
import {SlArrowRight} from 'react-icons/sl'


const Orders = () => {
  const {user} = useContext(CartContext)
  const [data, setData] = useState([])
  const getOrders = async () => {
    const itemsCollection = collection(db, user?.email);
    const items = await getDocs(itemsCollection);
    const itemList = items.docs.map(doc => doc.data())
    setData(itemList)
  }
  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div className='lg:min-h-screen lg:bg-white'>
      <div className='flex flex-col lg:gap-5 max-w-4xl mx-auto'>
        <h2 className='p-3 font-semibold text-dark-green lg:text-black lg:font-normal lg:text-3xl border-b border-gray-300 bg-white mb-10'>Your Orders</h2>
        {data.map(item => (
          <div  key={item?.order.id} className='bg-white border-b lg:border rounded-xl border-gray-300 flex flex-col'>
          <div className='lg:flex rounded-t-xl border-b text-gray-500 bg-gray-accent hidden p-3 gap-5'>
            <div className="flex flex-col text-xs">
              <span>ORDER PLACED</span>
              {new Date(item?.orderDate?.seconds*1000).toDateString()}
            </div>
            <div className="flex flex-col text-xs">
              <span>TOTAL</span>
              ₹{ item?.order[0].price}
            </div>
          </div>
          <div className='bg-white border-gray-300 flex items-center p-1 lg:rounded-b-xl'>
            <img src={item?.order[0].image} alt="item" className='h-28 flex-1 object-contain'/>
            <div className='flex-[2] flex flex-col justify-center pr-2'>
              <h2 className='font-semibold text-sm h-12 lg:h-14 overflow-hidden py-2 lg:py-0 lg:pr-10'>{item?.order[0].title}</h2>
              <span className='text-xs text-gray-500'>Ordered on {new Date(item?.orderDate?.seconds*1000).toDateString().slice(4).replace(' ', '-')}</span>
            </div>
            <SlArrowRight size={20} className='lg:hidden'/>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders