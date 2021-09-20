//front-end
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Login from '../login'
import TextEditor from '../../components/feed/text-editor/TextEditor'
//back-end
import { auth, store } from '../../firebase'
import { useRouter } from 'next/router'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

function Document () {
  const [user] = useAuthState(auth)
  if (!user) return <Login />
  const router = useRouter()
  const { id } = router.query
  const [snapshot, loadingSnapshot] = useDocumentOnce(
    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .doc(id)
  )

  if (!loadingSnapshot && !snapshot?.data()?.fileName) {
    router.replace('/')
  }

  return (
    <div>
      {/**header */}
      <header
        className=' 
      flex 
      items-center
      justify-between 
      p-3 
      pb-1
      shadow-lg
      '
      >
        <span onClick={() => router.push('/')} className='cursor-pointer'>
          <Icon name='description' size='5xl' color='blue' />
        </span>
        <div className='ml-2 flex-grow px-2 '>
          <h2 className=''>{snapshot?.data()?.fileName}</h2>
          <div className='flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600'>
            <p className='option'>File</p>
            <p className='option'>Edit</p>
            <p className='option'>View</p>
            <p className='option'>Insert</p>
            <p className='option'>Format</p>
            <p className='option'>Tools</p>
          </div>
        </div>
        <Button
          color='lightBlue'
          buttonType='filled'
          size='regular'
          className=' h-10'
          rounded={false}
          block={false}
          iconOnly={false}
          ripple='light'
        >
          <Icon name='people' size='md' />
          Share
        </Button>
        <img
          loading='lazy'
          src={user?.photoURL}
          className='cursor-pointer h-10 w-10 rounded-full ml-2'
          alt=''
          onClick={() => auth.signOut()}
        />
      </header>
      <TextEditor />
    </div>
  )
}

export default Document
