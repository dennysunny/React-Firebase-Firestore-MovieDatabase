import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCeqXH2LySPklDbDEyRTJsi9veMFbrupmM",
    authDomain: "reactfirebasetmr.firebaseapp.com",
    databaseURL: "https://reactfirebasetmr.firebaseio.com",
    projectId: "reactfirebasetmr",
    storageBucket: "reactfirebasetmr.appspot.com",
    messagingSenderId: "120139749864",
    appId: "1:120139749864:web:99969dbb64ded7b55d6c5d",
    measurementId: "G-80FKVPT660"
};

firebase.initializeApp(config);
firebase.analytics();

//userAuth is coming from data that firebase stores.
//additionalData is for other data we would need
export const createUserProfileDocument = async(userAuth, additionalData) => {
    //if theres no userAuth, exit from statement
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //snapshot will check if user exists
    const snapShot = await userRef.get();

    //this will create a new user in the database
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

// export const movieInfo = () => {
//     let ref = firebase.database().ref
// }

export const database=firebase.database();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
firestore.settings(
    {timestampsInSnapshots : true}
)

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
    
    auth.signInWithPopup(provider);
    //firebase.auth().signInWithRedirect(provider);
};

const providerFb=new firebase.auth.FacebookAuthProvider();
//providerFb.setCustomParameters({ prompt: 'select_account' });
export const signInWithFB = () => {
    //firebase.auth().signInWithPopup(providerFb);
    firebase.auth().signInWithPopup(providerFb);
    console.log("facebook login")
};

const providerGit = new firebase.auth.GithubAuthProvider();

export const signInWithGit = () => {
    //firebase.auth().signInWithPopup(providerGit)
    firebase.auth().signInWithPopup(providerGit);
    console.log("git login")
};
export default firebase;