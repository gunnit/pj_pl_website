import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { store } from '../../redux/store';
import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { firebaseConfig, apiBaseUrl } from '../../config';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import Context from 'context/Context';
// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance
};

const ADMIN_EMAILS = ['demo@minimals.cc'];

// ----------------------------------------------------------------------

function FirebaseProvider({ children }) {
  const { profile } = useSelector(state => state.firebase);
  const { userEmail, setUserEmail, setUserId, setProcessCounts, token, setToken } = useContext(Context)

  useEffect(() => {
    const Initialise = async () => {
      try {
        firebase.auth().onAuthStateChanged(async (user) => {
          // console.log(user)
          // const token = await firebase.auth().currentUser.getIdToken(true);
          // setToken(token)


          if (user && user.email) {
            setUserEmail(user.email)
          }



          if (user && isLoaded(profile) && !profile.role) {
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set(
                {
                  role: ADMIN_EMAILS.includes(user.email) ? 'admin' : 'user'
                },
                { merge: true }
              );
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    Initialise();
  }, [profile]);

  useEffect(() => {
    // If user email from Firebase has been stored in the context, check for user in database using that email
    if (userEmail) {


      (async () => {

        const token = await firebase.auth().currentUser.getIdToken(true);
        console.log(token)
        const res = await fetch(`${apiBaseUrl}/register/`, {
          method: 'POST',
          body: JSON.stringify({
            // add name
            email: userEmail,
          }),
          headers: {
            "Content-Type": 'application/json',
            "Authorization": token
          }
        })
        const { id, process_counts } = await res.json()

        // userId in context will be used for future user database relationships
        setUserId(id)

        // processCounts in context will be used to display the numbers on the navbar
        setProcessCounts(process_counts)


      })()

    }
  }, [userEmail])

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      {children}
    </ReactReduxFirebaseProvider>
  );
}

export default FirebaseProvider;
