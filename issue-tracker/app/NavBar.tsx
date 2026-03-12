import Link from 'next/link'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'

const NavBar = () => {

    const links =[
        {name:'Dashboard',href:'/'},
        {name:'Issues',href:'/issues'},
    ]
  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-5">
      <Link href="/"><AiFillBug/></Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href} className="text-zinc-500 hover:text-zinc-800 transition-colors">
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
