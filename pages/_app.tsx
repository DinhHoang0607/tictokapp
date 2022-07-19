import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {GoogleOAuthProvider} from '@react-oauth/google'

function MyApp({Component, pageProps}: AppProps) {
  const [isSRR, setIsSRR] = useState(true)
  useEffect(() => {
    setIsSRR(false)
  }, [])
  if (isSRR) return null

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
