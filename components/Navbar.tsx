import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'
import {GoogleLogin, googleLogout} from '@react-oauth/google'
import {AiOutlineLogout} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import {IoMdAdd} from 'react-icons/io'
import Logo from '../utils/tiktik-logo.png'
import {createOrGetUser} from '../utils'
import useAuthStore from '../store/authStore'

const Navbar = () => {
  // const [user, setUser] = useState(false)
  const {
    userProfile,
    addUser,
    removeUser,
  }: {userProfile: any; addUser: any; removeUser: any} =
    useAuthStore()
  console.log(userProfile, addUser)

  return (
    <div className="w-full flex justify-between items-center border-b-2 boder-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image src={Logo} alt="#" layout="responsive" />
        </div>
      </Link>
      <div>Search</div>
      <div>
        {userProfile ? (
          <div className="flex gap-8">
            <Link href="/upload">
              <button className="border-2 flex items-center gap-2 px-2 text-md font-semibold">
                <IoMdAdd className="text-xl" />{' '}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    src={userProfile.image}
                    width={43}
                    height={43}
                    className="rounded-full cursor-pointer"
                    alt="profile photo"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                googleLogout(), removeUser()
              }}>
              <AiOutlineLogout color="red" fontSize={23} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) =>
              createOrGetUser(response, addUser)
            }
          />
        )}
      </div>
    </div>
  )
}
export default Navbar
