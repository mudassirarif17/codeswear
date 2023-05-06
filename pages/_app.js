import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import '@/styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState , useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [cart , setCart] = useState({})
  const [subTotal , setSubTotal] = useState(0)
  const [key , setKey]=useState();
  const [user , setUser]=useState({value : null})
  const [progress, setProgress] = useState(0)
  const router = useRouter();
  useEffect(()=>{
    router.events.on('routeChangeStart' , ()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete' , ()=>{
      setProgress(100);
    })
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error)
      localStorage.clear();
    }
    const token = localStorage.getItem('token')
    if(token){
      setUser({value: token})
      setKey(Math.random())
    }
  } , [router.query])

  const saveCart = (myCart)=>{
    localStorage.setItem("cart" , JSON.stringify(myCart))
    let subt = 0;
    let keys=Object.keys(myCart);
    for(let i=0; i<keys.length; i++){
      subt += myCart[keys[i]]["price"] * myCart[keys[i]]["qty"];
    }
    setSubTotal(subt);
    // console.log(subTotal);
  }

  const addToCart = (itemCode , qty , price , name , size , variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else{
      newCart[itemCode] = {qty:1 , price , name , size , variant}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const removeFromCart = (itemCode , qty , price , name , size , variant)=>{
    let newCart = JSON.parse(JSON.stringify(cart))
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if(newCart[itemCode]["qty"]<=0)
    {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }

  const logout = () =>{
    localStorage.removeItem('token')
    setKey(Math.random())
    router.push('/');
    setUser({value:null})
  }
  const buyNow = (itemCode , qty , price , name , size , variant) => {
    let newCart = {itemCode:{qty:1 , price , size , name , variant }}
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout');
  }

  return<>
  <Head>
  <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0"/>
  </Head>
  <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={200}
        onLoaderFinished={() => setProgress(0)}
      />
  {<Navbar key={key} Logout={logout} user={user} cart={cart} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} subTotal={subTotal}/>}
  <Component buyNow={buyNow} cart={cart} addToCart={addToCart} clearCart={clearCart} removeFromCart={removeFromCart} subTotal={subTotal} {...pageProps} />
  <Footer/>
  </> 
}
