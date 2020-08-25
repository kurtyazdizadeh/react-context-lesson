import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBFHNhfb9yCz2zwXUCWm9-flARr76PHuyE",
  authDomain: "crwn-db-e4ccb.firebaseapp.com",
  databaseURL: "https://crwn-db-e4ccb.firebaseio.com",
  projectId: "crwn-db-e4ccb",
  storageBucket: "crwn-db-e4ccb.appspot.com",
  messagingSenderId: "398732455120",
  appId: "1:398732455120:web:20cd6af23ac0ab68a482d5",
  measurementId: "G-4KJC89GVFB"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
