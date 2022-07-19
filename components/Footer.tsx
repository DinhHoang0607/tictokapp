import React from 'react'
import {
  footerList1,
  footerList2,
  footerList3,
} from '../utils/constants'
const Footer = () => {
  const List = ({list}: {list: string[]}) => (
    <div className="flex flex-wrap gap-2 mt-5">
      {list.map((footer) => (
        <p
          key={footer}
          className="text-gray-400 text-sm hover:text-gray-700 hover:underline cursor-pointer">
          {footer}
        </p>
      ))}
    </div>
  )
  return (
    <div className="mt-6 hidden xl:block">
      <List list={footerList1} />
      <List list={footerList2} />
      <List list={footerList3} />
      <p className="text-gray-400 text-sm mt-5">
        06/07/2022 Ng.Đ Hoàng
      </p>
    </div>
  )
}

export default Footer
