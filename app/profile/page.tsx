import React from 'react'
import { getSession} from '../lib'
import{redirect} from 'next/navigation'
import Link from 'next/link'

export default async function profile() {
    const session = await getSession()
    let user = session?.user
    // console.log(user)
    if(!user){
        redirect('/')
    }
  return (
    <div>
        <Link href="/home">Home</Link> 
        <Link href="/">Log In</Link>
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
    </div>
  )
}
