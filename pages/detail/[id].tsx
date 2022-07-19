import {useRouter} from 'next/router'
import axios from 'axios'
import React from 'react'
import {Video} from '../../types'

interface Iprops {
  videos: Video[]
}

const Detail = ({videos}: Iprops) => {
  const router = useRouter()
  // console.log(router.query);
  console.log(videos);
  const {id} = router.query
  return <div>{id}</div>
}

export default Detail

export const getServerSideProps = async () => {
  const {data} = await axios.get(
    'http://localhost:3000/api/post'
  )
  // console.log(data)
  return {
    props: {videos: data},
  }
}
