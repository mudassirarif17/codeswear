import React , {useEffect} from 'react'
import {useRouter } from 'next/router';
const account = () => {
  const router = useRouter();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      router.push("/")
    }
  }, [])
  return (
    <div>
      Account
    </div>
  )
}

export default account
