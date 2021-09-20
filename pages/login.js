//front-end
import Button from '@material-tailwind/react/Button'
import Head from 'next/head'
import Image from 'next/image'
//back-end
import { auth, provider } from '../firebase'

function Login () {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }
  return (
    <div
      className='
        flex
        flex-col 
        items-center
        justify-center
        min-h-screen
        py-2 
        bg-white'
    >
      <Head>
        <title>Login-page</title>
      </Head>
      <Image
        src='https://links.papareact.com/1ui'
        height='300'
        width='550'
        objectFit='contain'
      />
      <Button
        color='blue'
        buttonType='filled'
        ripple='light'
        className='w-44 mt-10'
        onClick={signIn}
      >
        Sign in
      </Button>
    </div>
  )
}

export default Login
