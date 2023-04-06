import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext'
import Product from '../components/Product'
import { auth } from "../firebase";
import {collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase';
import Slider from '../components/Slider';

const Home = () => {
  const {setUser, user, setAddress} = useContext(CartContext)
  const [data, setData] = useState([])
  const [shown, setShown] = useState(false)

  async function getData(db) {
    const itemsCollection = collection(db, 'products');
    const items = await getDocs(itemsCollection);
    const itemList = items.docs.map(doc => doc.data())
    setData(itemList)
    setShown(true)
  }

  async function getAddress(db) {
    if(user) {
    const docRef = doc(db, "users", user?.email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const addr = (docSnap.data());
      setAddress(addr.address)
    } else {
      console.log("No Address Provided");
    }
  }
  }

  useEffect(() => {
    auth.onAuthStateChanged(state => {
      setUser(state)
    })
    getData(db)
    getAddress(db)
  }, [user])

  return (
    <div>
        <div className='max-w-[1500px] mx-auto relative'>
            <Slider />
            <div className={`absolute top-40 md:top-64 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 p-2 md:p-5 md:pb-40 pb-20 gap-2 md:gap-5 ${shown && `bg-gradient-to-t from-main via-main to-transparent`}`}>
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