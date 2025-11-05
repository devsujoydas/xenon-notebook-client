import summaryProductImg from '../../../assets/products/product_1.png'

const SummaryProductCard = () => {
  return (
    <div className='flex justify-between items-start '>
      <div className='flex justify-center items-start gap-5'>
        <div>
          <img className='md:h-30 h-20' src={summaryProductImg} alt="" />
        </div>
        <div className=' space-y-1.5 md:space-y-3'>
          <h1 className=' text-lg md:text-xl font-semibold'>Hydrating Essence</h1>
          <h1 className=' text-sm md:text-lg text-zinc-600'>Quantity: 1</h1>
        </div>
      </div>
      <div>
        <h1 className=' text-xl md:text-3xl font-semibold'>$69</h1>
      </div>
    </div>
  )
}

const OrderSummary = () => {
  return (
    <div>
      <div>
        <h1 className='font-semibold text-xl md:text-2xl pb-5'>Order Items</h1>
        <div className='space-y-6'>
          <SummaryProductCard />
          <SummaryProductCard />
        </div>
      </div>

      <hr className='text-zinc-300 my-4 md:my-8' />

      <div>
        <h1 className='font-semibold text-xl md:text-2xl pb-3 md:pb-5'>Shipping Information</h1>
        <div>
          <div className='space-y-1.5 md:space-y-3'>
            <div className='font-medium text-sm md:text-xl flex justify-between items-center'>
              <h1>Subtotal</h1>
              <h1>$152.00</h1>
            </div>
            <div className='font-medium text-emerald-500 text-sm md:text-xl flex justify-between items-center'>
              <h1>Discount (10%)</h1>
              <h1>$5.99</h1>
            </div>
            <div className='font-medium text-sm md:text-xl flex justify-between items-center'>
              <h1>Shipping</h1>
              <h1>$5.99</h1>
            </div>
            <div className='font-medium text-sm md:text-xl flex justify-between items-center'>
              <h1>TAX</h1>
              <h1>$15.99</h1>
            </div>
          </div>
          <hr className='text-zinc-300 my-3 md:my-5' />

          <div className='text-lg md:text-2xl font-bold flex justify-between items-center'>
            <h1>Total</h1>
            <h1>$157.99</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OrderSummary