import Product from '../../models/Product';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Post = ({ product, variants, cart, addToCart, buyNow }) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState("");
  const [service, setService] = useState();

  const changeHandler = (e) => {
    setPin(e.target.value)
    // console.log(pin)
  }

  const checkServiceHandler = async () => {
    let pins = await fetch(`http://localhost:3000/api/pincode`)
    let pinjson = await pins.json();
    // console.log(pinjson);
    if (pinjson.includes(pin)) {
      setService(true)
      toast.success('Your Pin Code Serviceable!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      setService(false)
      toast.error('Your Pin Code not Serviceable!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // console.log(service);
  }
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)

  const refreshVariant = (newSize, newColor) => {
    let url = `http://localhost:3000/product/${variants[newColor][newSize]["slug"]}`
    window.location = url;
  }

  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={ 5000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />

      <div className="container flex justify-center px-5 py-24">
        <div className="lg:w-4/5 justify-center flex flex-wrap">
          <img alt="ecommerce" className="h-[200px] rounded" src={ product.img } />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{ product.title } ({ product.size }/{ product.color })</h1>
            <p className="leading-relaxed">{ product.desc }</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>

                { Object.keys(variants).includes("red") && Object.keys(variants["red"]).includes(size) && (
                  <button
                    onClick={ () => {
                      refreshVariant(size, "red")
                    } }
                    className={ `border-2 rounded-full bg-red-600 w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}` }></button>
                ) }
                { Object.keys(variants).includes("blue") && Object.keys(variants["blue"]).includes(size) && (
                  <button
                    onClick={ () => {
                      refreshVariant(size, "blue")
                    } }
                    className={ `border-2 rounded-full bg-blue-600 w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}` }></button>
                ) }

                { Object.keys(variants).includes("black") && Object.keys(variants["black"]).includes(size) && (
                  <button
                    onClick={ () => {
                      refreshVariant(size, "black")
                    } }
                    className={ `border-2 rounded-full bg-black-600 w-6 h-6 focus:outline-none ${color === 'black' ? 'border-pink-600' : 'border-gray-300'}` }></button>
                ) }

                { Object.keys(variants).includes("white") && Object.keys(variants["white"]).includes(size) && (
                  <button
                    onClick={ () => {
                      refreshVariant(size, "white")
                    } }
                    className={ `border-2 rounded-full bg-white-600 w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}` }></button>
                ) }

                { Object.keys(variants).includes("pink") && Object.keys(variants["pink"]).includes(size) && (
                  <button
                    onClick={ () => {
                      refreshVariant(size, "pink")
                    } }
                    className={ `border-2 rounded-full bg-pink-600 w-6 h-6 focus:outline-none ${color === 'pink' ? 'border-black' : 'border-gray-300'}` }></button>
                ) }

                { Object.keys(variants).includes("green") && Object.keys(variants["green"]).includes(size) && (
                  <button
                    onClick={ () => {
                      refreshVariant(size, "green")
                    } }
                    className={ `border-2 rounded-full bg-green-600 w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}` }></button>
                ) }

                { Object.keys(variants).includes("yellow") && Object.keys(variants["yellow"]).includes(size) && (
                  <button
                    onClick={ () => {
                      refreshVariant(size, "yellow")
                    } }
                    className={ `border-2 rounded-full bg-yellow-600 w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-300'}` }></button>
                ) }
              </div>

              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select
                    value={ size }
                    onChange={ (e) => {
                      refreshVariant(e.target.value, color)
                    } } className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                    { Object.keys(variants[color]).includes("S")
                      && (
                        <option value={ 'S' }>S</option>
                      ) }

                    { Object.keys(variants[color]).includes("M")
                      && (
                        <option value={ 'M' }>M</option>
                      ) }
                    L
                    { Object.keys(variants[color]).includes("L")
                      && (
                        <option value={ 'L' }>L</option>
                      ) }

                    { Object.keys(variants[color]).includes("XL")
                      && (
                        <option value={ 'XL' }>XL</option>
                      ) }

                    { Object.keys(variants[color]).includes("XXL")
                      && (
                        <option value={ 'XXL' }>XXL</option>
                      ) }
                  </select>

                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className='flex'>
                <span className="title-font font-medium text-2xl text-gray-900">Rs{ product.price }</span>
                <button onClick={ () => { buyNow(slug, 1, product.price, product.title, size, color) } } className="flex mx-2 text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded">Buy now</button>

                {/* <button onClick={ () => { addToCart(product.slug, product.qty, product.price, product.title, product.size, product.variant) } } className="flex text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded">Add to cart</button> */ }
                <button onClick={ () => {
                  addToCart
                    (slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color)
                } } className="flex text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded">Add to cart</button>

              </div>
              <div className='flex mt-2'>
                <input onChange={ changeHandler } value={ pin } className='h-8 border-2 border-gray-500 rounded-md' type="text" placeholder='Check your pin here' />
                <button onClick={ checkServiceHandler } className="mx-2 text-sm flex text-white bg-pink-500 border-0 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded">Checked</button>
              </div>
              { service && service != null && <p className='text-green-600 text-center'>Our service is available in your area</p> }
              { !service && service != null && <p className='text-red-500 text-center'>Our service is not  available in your area</p> }
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default Post

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let product = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {} //{red: {xl: {slug: "wear-the-code-xl"}}}
  // console.log(colorSizeSlug)
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify((product))), variants: JSON.parse(JSON.stringify((colorSizeSlug)))
    },
  }
}

