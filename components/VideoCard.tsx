import {NextPage} from 'next'
import React, {useRef, useState} from 'react'
import {Video} from '../types'
import Image from 'next/image'
import Link from 'next/link'
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi'
import {BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs'
import {GoVerified} from 'react-icons/go'
import {BsPlay} from 'react-icons/bs'

interface Iprops {
  post: Video
}

const VideoCard: NextPage<Iprops> = ({post}) => {
  const [isHover, setIsHover] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMute, setIsMute] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const handleVideoPress = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  const classBtn = 'text-black text-2xl lg:text-4xl'
  return (
    <div className="flex flex-col border-b-2 pb-6 border-gray-200">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  src={post.postedBy.image}
                  width={67}
                  height={67}
                  className="rounded-full"
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="capitalize flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy?.userName}{' '}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium md:block text-gray-500 text-xs ">
                  {post.postedBy?.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
          <Link href={`/detail/${post._id}`}>
            <video
              src={post.video?.asset.url}
              loop
              ref={videoRef}
              className="lg:w[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[700px] rounded-2xl cursor-pointer bg-gray-100"
            />
          </Link>
          {isHover && (
            <div className=" absolute bottom-6 flex gap-10 justify-between cursor-pointer left-[30%]">
              {!isPlaying ? (
                <button
                  className={classBtn}
                  onClick={handleVideoPress}>
                  <BsFillPlayFill />
                </button>
              ) : (
                <button
                  className={classBtn}
                  onClick={handleVideoPress}>
                  <BsFillPauseFill />
                </button>
              )}
              {isMute ? (
                <button
                  onClick={() => setIsMute(false)}
                  className={classBtn}>
                  <HiVolumeOff />
                </button>
              ) : (
                <button
                  onClick={() => setIsMute(true)}
                  className={classBtn}>
                  <HiVolumeUp />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
