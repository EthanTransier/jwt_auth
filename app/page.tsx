import{redirect} from 'next/navigation'
import { getSession, login, logout} from './lib'

export default async function Home() {
  const session = await getSession()
  return (
   <section className='login-container'>
    <form action={async (formdata)=>{
      'use server'
      if(await login(formdata)){
        redirect('/home')
      }
    }} className='login'>
      
      <div className='input-container'>
        <div className='inputs'>
          <h3>Email: </h3>
          <input type="email" name='email'id='email'/>
        </div>
        <div className='inputs'>
          <h3>Password: </h3>
          <input type="password" name="password" id="password"/>
        </div>
      </div>
      <h1 className='login-title'>JWT Challenge</h1>
      <button type='submit' className='login-button'>Login</button>
    </form>
    <form className='logout-form' action={async (formdata)=>{
      'use server'
      await logout()
      redirect('/')
    }}>
      <button type='submit' className='logout-button'>Logout</button>
    </form>
    {/* <pre>{JSON.stringify(session,null,2)}</pre> */}
   </section>
  );
}
