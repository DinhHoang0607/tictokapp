import {SanityAssetDocument} from '@sanity/client'
import axios from 'axios'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {MdCloudUpload} from 'react-icons/md'
import useAuthStore from '../store/authStore'
import {client} from '../utils/client'
import {topics} from '../utils/constants'
const Upload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] =
    useState<SanityAssetDocument>()
  const [wrongFileType, setWrongFileType] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)
  const {userProfile}: {userProfile: any} = useAuthStore()
  const router = useRouter()

  const uploadVideo = async (e: any) => {
    setIsLoading(true)
    setWrongFileType(false)
    const selectedFile = e.target.files[0]
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']
    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setWrongFileType(true)
    }
  }
  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true)
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        usedId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      }
      await axios.post(
        'http://localhost:3000/api/post',
        document
      )
      router.push('/')
    }
  }
  return (
    <div className="w-full h-full bg-[#F8F8F8]">
      <div className="bg-white h-[80vh] flex rounded-lg m-10 p-10">
        <div>
          <div>
            {' '}
            <h2 className="text-2xl font-bold mb-2">
              Upload Video
            </h2>
            <p className="text-gray-400">
              UploadPost a video to your account
            </p>
          </div>
          <div className="border-dashed  p-5 w-[260px] h-[420px] border-gray-200 border-4 rounded-xl flex flex-col mt-10 hover:border-red-300 hover:bg-gray-100 outline-none cursor-pointer justify-center items-center">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      className="h-[400px] rounded"
                      controls
                    />
                  </div>
                ) : (
                  <label className="flex items-center flex-col cursor-pointer">
                    <MdCloudUpload className="text-7xl text-gray-300" />
                    <p className="text-lg font-semibold mb-10">
                      Select video to upload
                    </p>
                    <p className="text-sm text-center text-gray-400 flex leading-10">
                      MP4 or WebM or ogg
                      <br />
                      720x1280 resolution or higher
                      <br />
                      Up to 10 minutes
                      <br />
                      Less than 2 GB
                      <br />
                    </p>

                    <p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                      Select file
                    </p>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0 bg-black"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </>
            )}
          </div>
          {wrongFileType && (
            <p className="text-red-600 font-semibold text-lg text-center">
              Please a select video file
              <br />
              (mp4 or webm or ogg)
            </p>
          )}
        </div>
        <div className="mt-[110px] ml-8 flex flex-col gap-3">
          <label className="font-bold">Caption</label>
          <input
            type="text"
            className="border-2 w-[500px] rounded border-gray-200 p-3 outline-none text-md"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value)
            }}
          />
          <label className="font-bold">Choose a topic</label>
          <select
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            className="border-2 cursor-pointer rounded p-3 capitalize">
            {topics.map((topic) => (
              <option key={topic.name} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-5 mt-5">
            <button
              type="button"
              className="w-[150px] rounded  py-2 mt-4 border-gray-300 border-2">
              Discard
            </button>
            <button
              type="button"
              onClick={handlePost}
              className="w-[150px] rounded text-white bg-[#F51997] py-2 mt-4">
              {savingPost ? 'Posting video...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
