import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyBzJwG2lhWgvsEVCrqajUJWN8OmobfxU10',
  authDomain: 'ani-weda.firebaseapp.com',
  projectId: 'ani-weda',
  storageBucket: 'ani-weda.appspot.com',
  messagingSenderId: '161838913927',
  appId: '1:161838913927:web:5ffb390167fe02e4885b22'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
