import React from 'react'

const OrderShipping = () => {
  return (
    <div>
      <h1 className='font-semibold text-xl md:text-2xl pb-3 md:pb-6'>Shipping Address</h1>
      <div className=' text-sm md:text-xl  space-y-1 md:space-y-3'>
        <p>Sujoy Das</p>
        <p>devsujoydas@gmail.com</p>
        <p>+880 1303-436299</p>
        <p>Basakpara</p>
        <p>Jamalpur</p>
        <p>Mymensigh</p>
        <p>Bangladesh</p>
      </div>
      
      <hr className='text-zinc-300 my-4 md:my-8' />
      
      <h1 className='font-semibold text-xl md:text-2xl pb-2 md:pb-6'>Shipping Method</h1>
      <div className='text-sm md:text-xl'>
        <p>Standard Shipping (5-7 business days)</p>
      </div>

      <hr className='text-zinc-300 my-4 md:my-8' />
      
      <h1 className='font-semibold pb-3 md:pb-6 text-xl md:text-2xl'>Tracking Information</h1>
      <div className='space-y-3 text-sm md:text-xl'>
        <div className='font-medium flex justify-between items-center'>
          <h1>Tracking Number:</h1>
          <h1>IZ999AA10123456784</h1>
        </div>
        <div className='font-medium flex justify-between items-center'>
          <h1>Estimated Delivery</h1>
          <h1>May 27-29, 2023</h1>
        </div>
      </div>
    </div>
  )
}

export default OrderShipping