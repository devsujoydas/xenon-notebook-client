import React from 'react'
import { Link } from 'react-router-dom'

const OrderhistoryCard = ({order}) => {
  return (
    <div className='border-2 border-zinc-300 p-6 md:p-10 rounded-xl '>
      <div className='font-semibold text-xl md:text-2xl
       flex justify-between items-center'>
        <h1>Order ORD-12345</h1>
        <h1>Delivered</h1>
      </div>
      <div className='text-sm md:text-lg text-zinc-700
       flex justify-between items-center'>
        <h1>May 15, 2023</h1>
        <h1>$152.97</h1>
      </div>
      <div className=' text-sm mt-2 md:mt-5 mb-1 md:mb-2 flex justify-between items-center'>
        <h1>Hydrating Essence x 1</h1>
        <h1>$48.00</h1>
      </div>
      <div className=' text-sm mb-5 md:mb-10
       flex justify-between items-center'>
        <h1>Nourishing Cream x 2</h1>
        <h1>$104.00</h1>
      </div>


      <Link to={`/order-history/${order?.id}`} className='border flex justify-center items-center rounded-md w-full py-2 md:py-3.5 font-semibold hover:bg-zinc-100 active:bg-white cursor-pointer transition-all'>View Order Details</Link>
    </div>
  )
}

const Orderhistory = () => {
  return (
    <div className='space-y-10'>
      <OrderhistoryCard />
      <OrderhistoryCard />
      <OrderhistoryCard />
      <OrderhistoryCard />
      <OrderhistoryCard />
    </div>
  )
}

export default Orderhistory