//front-end
import dynamic from 'next/dynamic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
//back-end
import { auth, store } from '../../../firebase'
import { useEffect, useState } from 'react'
import { EditorState } from 'draft-js'
import { useRouter } from 'next/router'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(module => module.Editor),
  {
    ssr: false
  }
)

function TextEditor () {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { id } = router.query

  const [docSnapshot] = useDocumentOnce(
    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .doc(id)
  )

  useEffect(() => {
    if (docSnapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(docSnapshot?.data()?.editorState)
        )
      )
    }
  }, [docSnapshot])

  const onEditorStateChange = editorState => {
    setEditorState(editorState)

    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent())
        },
        {
          merge: true
        }
      )
  }

  return (
    <div className='bg-[#f8f9fa] min-h-screen pb-16'>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName='flex sticky top-0 z-50 justify-center '
        editorClassName='
        mt-6 
        bg-white 
        shadow-lg 
        max-w-6xl 
        mx-auto
        mb-12 
        border 
        p-10'
      />
    </div>
  )
}

export default TextEditor
