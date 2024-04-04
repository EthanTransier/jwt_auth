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
    <section>
        <nav>
        <h1>Welcome Back, {user.name}</h1>
            <div className="links-container">
                <Link href="/home">Home</Link> 
                <Link href="/">Login / Logout</Link>
            </div>
        </nav>
        <h4>Email: {user.email}</h4>
    </section>
  )
}
