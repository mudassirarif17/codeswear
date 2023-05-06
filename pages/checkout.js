import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";
import Link from 'next/link';


const checkout = ({cart , addToCart , clearCart , removeFromCart , subTotal}) => {
    return (
        <div className='w-[90vw] my-2 mx-auto'>
            <h1 className='text-center font-bold text-xl'>CheckOut</h1>
            <h2 className='text-xl font-bold'>1. Delivery details</h2>
            <div className='flex'>
                <div className="p-2 w-1/2">
                    <div className="relative">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="p-2 w-1/2">
                    <div className="relative">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className="p-2 w-full">
                    <div className="relative">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Addres</label>
                        <textarea className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" name="address" id="address" cols="30" rows="2"></textarea>
                    </div>
                </div>

                <div className='flex'>
                <div className="p-2 w-1/2">
                    <div className="relative">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="phone" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="p-2 w-1/2">
                    <div className="relative">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className='flex'>
                <div className="p-2 w-1/2">
                    <div className="relative">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="p-2 w-1/2">
                    <div className="relative">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input type="phone" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <h2 className='text-xl font-bold'>2. Review Cart items & Pay</h2>
            <ol className='px-6 list-decimal'>
          {Object.keys(cart)<= 0 && <div className='font-bold'>Cart is empty</div>}
          {Object.keys(cart).map((k)=>{return <li key={k} className='mt-2'>
            <div className='flex'>
              <div className='font-bold'>{cart[k].name}</div>
              <div className='flex p-1'><AiFillMinusCircle onClick={()=>removeFromCart(k , 1 , cart[k].price ,cart[k].name ,cart[k].size , cart[k].variant)} className='text-pink-500 text-xl mx-2 cursor-pointer' />{cart[k].qty}<AiFillPlusCircle onClick={()=>addToCart(k , 1 , cart[k].price ,cart[k].name ,cart[k].size , cart[k].variant)} className='text-pink-500 text-xl mx-2 cursor-pointer' /></div>
            </div>
          </li>}) }
        </ol>
        <h2 className='font-bold'>Subtotal:{subTotal}</h2>
        <Link href={'/order'}><button className='mx-1 bg-pink-500 text-white px-2 py-1 text-sm rounded-md'>Pay {subTotal}</button></Link>    
        </div>
    )
}

export default checkout
