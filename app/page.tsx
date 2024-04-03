import{redirect} from 'next/navigation'
import { getSession, login, logout} from './lib'
export default async function Home() {
  const session = await getSession()
  return (
   <section>
    <form action={async (formdata)=>{
      'use server'
      await login(formdata)
      redirect('/home')
    }}>
      <input type="email" name='email'id='email' style={{color: 'black'}}/>
      <input type="password" name="password" id="password" style={{color: 'black'}} />
      <button type='submit'>login</button>
    </form>
    <form action={async (formdata)=>{
      'use server'
      await logout()
      redirect('/')
    }}>
      <button type='submit'>logout</button>
    </form>
    <pre>{JSON.stringify(session,null,2)}</pre>
   </section>
  );
}
