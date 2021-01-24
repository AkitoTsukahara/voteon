import { Plugin } from '@nuxt/types'
import _firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $auth: firebase.auth.Auth & {
      user: firebase.User
      currentUser: firebase.User
    }
    $firebase: typeof _firebase
    $firestore: firebase.firestore.Firestore
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: firebase.auth.Auth & {
      user: firebase.User
      currentUser: firebase.User
    }
    $firebase: typeof _firebase
    $firestore: firebase.firestore.Firestore
  }
}

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
}

export const app = !_firebase.apps.length
  ? _firebase.initializeApp(config)
  : _firebase.app()

const FirebasePlugin: Plugin = ({ app: { $accessor } }, inject) => {
  inject('firebase', _firebase)
  inject('firestore', _firebase.firestore())
  inject('auth', _firebase.auth())

  // eslint-disable-next-line promise/param-names
  const authResolver = new Promise<firebase.User | null>((resolve, _) => {
    _firebase.auth().onAuthStateChanged((user) => resolve(user))
  })

  return authResolver.then((userInfo: firebase.User | null) => {
    if (userInfo) {
      $accessor.login.setUserInfo(userInfo)
    }
  })
}

export default FirebasePlugin

export const firebase = _firebase
export const firestore = app.firestore()
export const auth = app.auth()
