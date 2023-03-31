import React, {useState, useEffect} from 'react'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'

const Slider = () => {
  const[slide, setSlide] = useState(0)
  const images = [
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61+Om+g+8SL._SX3000_.jpg",
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61kdtk1sXJL._SX3000_.jpg",
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81YUT30R1KL._SX3000_.jpg",
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61s5QLgMYGL._SX3000_.jpg",
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71naBZ3Md0L._SX3000_.jpg"
  ]

  const prevImage = () => {
    setSlide(slide === 0 ? images.length-1 : (prev) => prev - 1)
  }

  const nextImage = () => {
    setSlide(slide === images.length-1 ? 0 : (prev) => prev + 1)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
        // nextImage()
    }, 5000)

    return () => clearInterval(intervalId);
    }, [slide])

  return (
    <div className='flex absolute top-0 -z-10 h-60 sm:h-auto object-cover w-full overflow-hidden'>
        <div className='flex transition-all duration-300 ease-out' style={{transform: `translateX(-${slide * 100}%)`}}>
            {images.map((image, i) => (
                <img key={image} src={images[i]}
                className='h-60 sm:h-auto object-cover w-[1500px]'/>
            ))}
        </div>
        <div className='absolute w-full flex z-10 justify-between p-2 lg:p-5 top-10 text-gray-main'>
            <BsChevronLeft size={50} onClick={prevImage} className='cursor-pointer z-50'/>
            <BsChevronRight size={50} onClick={nextImage}/>
        </div>
    </div>
  )
}

export default Slider