import Image from 'next/image'
import Link from 'next/link'
import React , {useRef , useState} from 'react'
import { AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { MdCancel , MdAccountCircle } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";

const Navbar = ({user  , key , Logout , cart , addToCart , clearCart , removeFromCart ,subTotal}) => {
  const ref = useRef();
  const [dropdown , setDropdown]=useState(false);
  // console.log(cart)
  const cartToggle = () =>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if(ref.current.classList.contains('translate-x-0')){
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  
  return (
    <div>
      <div className=''>
      <navbar className="flex flex-col sticky items-center md:flex-row md:justify-start shadow-md ">
        <div className='logo m-4 '>
          <Link href={ '/' }><Image src="/logo.webp" width={ 200 } height={ 40 } alt="logo" /></Link>
        </div>
        <nav>
          <ul className='flex space-x-5 font-bold m-4'>
            <Link href={ '/tshirts' }><li className='hover:text-pink-600'>Tshirts</li></Link>
            <Link href={ '/hoodies' }><li className='hover:text-pink-600'>Hoodies</li></Link>
            <Link href={ '/mugs' }><li className='hover:text-pink-600'>Mugs</li></Link>
            <Link href={ '/sticker' }><li className='hover:text-pink-600'>Stickers</li></Link>
          </ul>
        </nav>
        {dropdown &&<div onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)} className='absolute right-14 top-12 px-4 py-2 bg-white shadow-md text-sm font-semibold'>
            <ul>
            <Link href={'/account'}><li className='cursor-pointer'>My Account</li></Link>
              <Link href={'/orders'}><li>Orders</li></Link>
              <li className='cursor-pointer' onClick={Logout}>Logout</li>
            </ul>
          </div>}
        <div className="flex items-center absolute text-xl right-4  cart  md:text-4xl">
          {!user.value && <Link href={'/login'}><button className='mx-2 mb-2 bg-pink-600 text-sm px-2 py-1 text-white font-semibold rounded-lg hover:bg-pink-800'>Login</button></Link>}
          {user.value && <MdAccountCircle onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)} />}
          <AiOutlineShoppingCart onClick={cartToggle} />
          </div>
      </navbar>
      </div>

      <div ref={ref} className="cartbar overflow-y-scroll absolute top-0 right-0 bg-pink-100 z-10 w-60 h-full transform transition-transform translate-x-full">
        <div className='cross absolute top-2 right-2'><MdCancel onClick={cartToggle} className='text-pink-500 text-2xl cursor-pointer' /></div>
        <div className='text-center font-semibold my-6'>Shopping Cart</div>
        <ol className='px-6 list-decimal'>
          {Object.keys(cart)<= 0 && <div className='font-bold'>Cart is empty</div>}
          {Object.keys(cart).map((k)=>{return <li key={k} className='mt-2'>
            <div className='flex'>
              <div className='font-bold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
              <div className='flex p-1'><AiFillMinusCircle onClick={()=>removeFromCart(k , 1 , cart[k].price ,cart[k].name ,cart[k].size , cart[k].variant)} className='text-pink-500 text-xl mx-2 cursor-pointer' />{cart[k].qty}<AiFillPlusCircle onClick={()=>addToCart(k , 1 , cart[k].price ,cart[k].name ,cart[k].size , cart[k].variant)} className='text-pink-500 text-xl mx-2 cursor-pointer' /></div>
            </div>
          </li>}) }
        </ol>
        <h2 className='mx-5 font-bold'>Subtotal:{subTotal}</h2>
        <div className='m-5'>
          <Link href={'/checkout'}><button className='mx-1 bg-pink-500 text-white px-2 py-1 text-sm rounded-md' ><BsFillBagCheckFill className='inline-block'/> Checkout</button></Link>
          <button onClick={clearCart} className='mx-1 bg-pink-500 text-white px-2 py-1 text-sm rounded-md'>Clear cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
