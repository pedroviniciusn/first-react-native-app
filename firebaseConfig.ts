// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCGUSIURlkkKotLEi8WQ2fN8UryEqqGqu4',
  authDomain: 'dev-house-58e7e.firebaseapp.com',
  projectId: 'dev-house-58e7e',
  storageBucket: 'dev-house-58e7e.appspot.com',
  messagingSenderId: '400032454768',
  appId: '1:400032454768:web:5ac650629012c2b1f93cb5',
  measurementId: 'G-Z2GBE18RER',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
