//front-end
import '../styles/globals.css'
import '@material-tailwind/react/tailwind.css'
import Login from './login'
//back-end
import { auth, store } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import firebase from 'firebase'
import Loading from '../components/loading/Loading'

function MyApp ({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      store
        .collection('users')
        .doc(user.uid)
        .set(
          {
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName
          },
          { merge: true }
        )
    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />

  return (
    <>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
