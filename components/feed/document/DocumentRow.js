//front-end
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
//back-end
import { useRouter } from 'next/router'

function DocumentRow ({ id, fileName, timestamp }) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className='
    flex 
    items-center 
    p-4 
    rounded-lg 
    text-gray-700 
    cursor-pointer 
    text-sm 
    hover:bg-gray-100'
    >
      <Icon name='article' size='3xl' color='blue' />
      <p className='flex-grow pl-5 w-10 pr-10 truncate'>{fileName}</p>
      <p className='pr-5 text-sm'>{timestamp?.toDate().toLocaleDateString()}</p>
      <Button
        color='gray'
        buttonType='outline'
        rounded={true}
        iconOnly={true}
        ripple='dark'
        className='border-0'
      >
        <Icon name='more_vert' size='3xl' />
      </Button>
    </div>
  )
}

export default DocumentRow
