import { ArrowLeft, Link, User } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OrderSummary from './OrderSummary'
import OrderShipping from './OrderShipping'

const OrderHistoryDetails = () => {
    const params = useParams()
    console.log(params.id)
    const navigate = useNavigate()

    const [activeBtn, setActiveBtn] = useState(true)

    const activeClass =
        "flex items-center gap-2 bg-black rounded-full px-4 py-2 text-white border border-transparent duration-300 transition-all cursor-pointer active:scale-95";
    const inactiveClass =
        "flex items-center gap-2 rounded-full px-4 py-2 text-black border border-black bg-transparent duration-300 transition-all cursor-pointer active:scale-95";


    return (
        <div className='bg-main py-10 md:py-30'>

            <div className='w-main'>
                <h1 onClick={() => { navigate(-1) }} className='flex items-center gap-2 mb-10 md:mb-14 text-lg md:text-2xl cursor-pointer'><ArrowLeft /> Back to Account</h1>

                <div className=' p-6 md:p-10 bg-white'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-semibold text-xl md:text-3xl'>Order ORD-12345</h1>
                        <h1 className='bg-[#16653433] text-[#166534] px-3 py-1 text-xs md:text-sm rounded-full'>Shipped</h1>
                    </div>
                    <div className=' text-sm md:text-xl text-zinc-700 flex justify-between items-center mt-1 md:mt-2'>
                        <h1>Placed on May 15, 2023</h1>
                    </div>

                    <div className="flex items-center gap-5 my-5 text-xs md:text-sm">
                        <button onClick={() => { setActiveBtn(true) }} className={activeBtn ? activeClass : inactiveClass}>Summary</button>
                        <button onClick={() => { setActiveBtn(false) }} className={activeBtn ? inactiveClass : activeClass}>Shipping</button>
                    </div>



                    {activeBtn ?
                        <OrderSummary />
                        :
                         <OrderShipping />
                    }

                </div>
            </div>

        </div>
    )
}

export default OrderHistoryDetails