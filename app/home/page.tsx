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
    <nav>
      <h1>Home</h1>
      <div className="links-container">
        <Link href="/profile">Profile</Link>
        <Link href="/">Login / Logout</Link>
      </div>
    </nav>
    <h4>Welcome Home</h4>
   </section>
  );
}
