import Link from 'next/link'
import React, {useState} from 'react'
import GoogleLogin from 'react-google-login'
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import Discover from './Discover'
import Footer from './Footer'
import SuggestedAccount from './SuggestedAccount'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const normalLink =
    'flex items-center gap-3 rounded hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997]'
  const isLogin = false
  return (
    <div>
      <div
        className="cursor-pointer m-2 ml-4 mt-3 text-xl "
        onClick={() => setShowSidebar((prev) => !prev)}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>
          {!isLogin && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                You must login to like, comment and watch video
              </p>
              <div className="pr-4">
                <GoogleLogin
                  render={(renderProps) => (
                    <button
                      className="text-[#f51997] cursor-pointer bg-white text-lg border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}>
                      Login
                    </button>
                  )}
                  clientId=""
                  buttonText="Login"
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccount />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar
