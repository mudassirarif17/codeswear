import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import Product from '../models/Product'
import mongoose from 'mongoose'


const Stickers = ({ products }) => {
  // console.log(products)
  const router = useRouter();
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col flex-wrap md:flex-row justify-center">
          {Object.keys(products).length === 0 && <p>Sorry All Stickers were sold out next stock comingsoon stay tuned!</p>}
            { Object.keys(products).map((item) => {
              return <div key={ products[item]._id } className="lg:w-1/4 md:w-1/4 p-4 w-full shadow-md cursor-pointer md:mx-5">
                <Link passHref={true} href={ `product/${products[item].slug}` }><div className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="m-auto h-full object-fill md:block" src={products[item].img} />
                </div>
                  <div className="text-center mt-4 md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{ products[item].title }</h2>
                    <p className="mt-1">Rs{ products[item].price }</p>
                    <div className="mt-1">
                      {products[item].size.includes("S") &&(<span className='border border-gray-600 px-1 mx-1'>S</span>)}
                      {products[item].size.includes("M") &&(<span className='border border-gray-600 px-1 mx-1'>M</span>)}
                      {products[item].size.includes("L") &&(<span className='border border-gray-600 px-1 mx-1'>L</span>)}
                      {products[item].size.includes("XL") &&(<span className='border border-gray-600 px-1 mx-1'>XL</span>)}
                      
                      {products[item].size.includes("XXL") &&(<span className='border border-gray-600 px-1 mx-1'>XXL</span>)}
                      
                    </div>

                    <div className="mt-1">
                      {products[item].color.includes("red") && <button className="bg-red-500 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}

                      {products[item].color.includes("blue") && <button className="bg-blue-500 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}

                      {products[item].color.includes("black") && <button className="bg-black mx-1 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}

                      {products[item].color.includes("green") && <button className="bg-green-500 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}

                      {products[item].color.includes("yellow") && <button className="bg-yellow-500 border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>}

                    </div>
                  </div></Link>
              </div>
            }) }
          </div>
        </div>
      </section>
    </div>
  )
}
// Simple method for geting allproducts
// export async function getServerSideProps(context) {
//   if (mongoose.connections[0].readyState) 
//   await mongoose.connect(process.env.MONGO_URI)
//   let products = await Product.find({category : "tshirt"})
//   return {
//     props: { products: JSON.parse(JSON.stringify((products))) },
//   }
// }

// changing the method for getting products according to size and colors
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let products = await Product.find({ category: "sticker" })
  let stickers = {}
  for (let item of products) {
    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
        stickers[item.title].color.push(item.color);
      }
      if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        stickers[item.title].size.push(item.size)
      }
    }
    else {
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color]
        stickers[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify((stickers))) },
  }
}

// Method by using api for getting all products
// export async function getServerSideProps(){
//   let data = await fetch(`http://localhost:3000/api/getproducts`)
//   let products = await data.json();
//   return{
//         // props: { products: JSON.parse(JSON.stringify((products))) },
//         props : {products : JSON.parse(JSON.stringify(products))}
//       }
//   }

export default Stickers;