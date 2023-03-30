import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext'
import Product from '../components/Product'
import { auth } from "../firebase";
import {collection, getDocs} from 'firebase/firestore'
import { db } from '../firebase';

const Home = () => {
  const {setUser, user} = useContext(CartContext)
  const [data, setData] = useState([])
  const [shown, setShown] = useState(false)

  async function getData(db) {
    const itemsCollection = collection(db, 'products');
    const items = await getDocs(itemsCollection);
    const itemList = items.docs.map(doc => doc.data())
    setData(itemList)
    setShown(true)
  }

  useEffect(() => {
    auth.onAuthStateChanged(state => {
      setUser(state)
    })
    getData(db)
    console.log(user)
  }, [])

  return (
    <div>
        <div className='max-w-[1500px] mx-auto relative pt-48 md:pt-64'>
        <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61+Om+g+8SL._SX3000_.jpg"
          className='absolute top-0 -z-10 h-60 sm:h-auto object-cover w-full'/>
        {/* <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61kdtk1sXJL._SX3000_.jpg"
          className='absolute top-0 -z-10'/> */}

            <div className={`grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 p-5 pb-20 gap-2 md:gap-5 ${shown && `bg-gradient-to-t from-main via-main to-transparent`}`}>
                {data.map((item, i) => {
                  return (
                    <Product 
                      key={i}
                      id={`product-${i}`}
                      rating={item.rating}
                      title={item.title} 
                      price={item.price}
                      image={item.image}
                    />
                  )
                })}
            </div>
        </div>
    </div>
  )
}

export default Home