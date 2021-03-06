//front-end
import Head from 'next/head'
import Header from '../components/header/Header'
import Button from '@material-tailwind/react/Button'
import DocumentRow from '../components/feed/document/DocumentRow'
import Icon from '@material-tailwind/react/Icon'
import Image from 'next/image'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
//back-end
import { useState } from 'react'
import firebase from 'firebase'
import { auth, store } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

export default function Home () {
  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')
  const [user] = useAuthState(auth)

  const [docsSnapshot] = useCollectionOnce(
    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
  )

  const createDocument = () => {
    if (!input) return

    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    setInput('')
    setShowModal(false)
  }

  const modal = (
    <Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
          className='outline-none w-full'
          placeholder='Enter name of document'
          onKeyDown={e => e.key === 'Enter' && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={e => setShowModal(false)}
          ripple='dark'
        >
          Cancel
        </Button>
        <Button color='blue' onClick={createDocument} ripple='light'>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div>
      <Head>
        <title>Docs-Online</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/**Header file */}
      <Header />
      {modal}
      <section className='bg-[#f8f9fa] pb-10 px-10'>
        <div
          className='
        max-w-3xl
        mx-auto
        '
        >
          <div className='py-6 flex items-center justify-between'>
            <h2 className='text-gray-700 text-lg'>Start a new document</h2>
            <Button
              color='gray'
              buttonType='outline'
              iconOnly={true}
              ripple='dark'
              className='border-0'
            >
              <Icon name='more_vert' size='3xl' />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className='
            relative 
            h-52 
            w-40 
            border-2 
            cursor-pointer 
            hover:border-blue-700'
            >
              <Image
                src='https://links.papareact.com/pju'
                layout='fill'
                objectFit='contain'
              />
            </div>
            <p
              className='
            ml-2 
            mt-2 
            font-semibold 
            text-gray-700 
            text-sm'
            >
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow'>My documents</h2>
            <p className='mr-12'>Date created</p>
            <Icon name='folder' size='3xl' color='gray' />
          </div>
          {docsSnapshot?.docs.map(doc => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              timestamp={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
