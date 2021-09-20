//front-end
import Image from 'next/image'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
//back-end
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Header () {
  const [user] = useAuthState(auth)
  return (
    <header
      className='
        z-50
        top-0
        px-4
        py-2
        bg-white
        sticky
        shadow-md
        flex
        items-center
        '
    >
      <Button
        color='gray'
        buttonType='outline'
        rounded={true}
        iconOnly={true}
        ripple='dark'
        className='h-20 w-20 border-0'
      >
        <Icon name='menu' size='3xl' />
      </Button>
      <Icon name='description' size='5xl' color='blue' />
      <h1
        className='
      ml-2
      text-gray-700
      text-2xl
      '
      >
        Docs
      </h1>
      <div
        className='
        mx-5
        md:mx-20
        flex
        flex-grow
        items-center
        px-5
        py-2
        rounded-lg
        bg-gray-100
        focus-within:text-gray-600
        focus-within:shadow-md
      '
      >
        <Icon name='search' size='5xl' colr='darkgray' />
        <input
          placeholder='Search'
          type='text'
          className='
          placeholder-gray-400
          bg-transparent
          outline-none
          border-0
          flex-grow
          px-5
          text-base
          '
        />
      </div>
      <Button
        color='gray'
        buttonType='outline'
        rounded={true}
        iconOnly={true}
        ripple='dark'
        className='ml-5 md:ml-20 h-20 w-20 border-0'
      >
        <Icon name='apps' size='3xl' color='gray' />
      </Button>
      <img
        loading='lazy'
        src={user?.photoURL}
        className='cursor-pointer h-12 w-12 rounded-full ml-2'
        alt=''
        onClick={() => auth.signOut()}
      />
    </header>
  )
}

export default Header
