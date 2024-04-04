import{redirect} from 'next/navigation'
import { getSession} from '../lib'
import Link from 'next/link'
// import { getSession, login, logout} from './lib'
export default async function Home() {
  const session = await getSession()
    let user = session?.user
    // console.log(user)
    if(!user){
        redirect('/')
    }
  return (
   <section>
    
    <Link href="/profile">Profile</Link>
    <Link href="/">Log In</Link>
    <h1>home</h1>
   </section>
  );
}
