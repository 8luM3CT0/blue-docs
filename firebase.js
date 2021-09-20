import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyA0prxm9sAcd7p5xjZR8qqYovlCeahtvxM',
  authDomain: 'docs-alpha.firebaseapp.com',
  projectId: 'docs-alpha',
  storageBucket: 'docs-alpha.appspot.com',
  messagingSenderId: '1027140796767',
  appId: '1:1027140796767:web:1cf5a12e1f10abd4b4b6ea',
  measurementId: 'G-TSC9FLG2N8'
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const store = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { store, auth, provider }
