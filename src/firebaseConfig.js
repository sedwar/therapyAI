import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Replace these with your real Firebase project values
const firebaseConfig = {
    apiKey: "AIzaSyD5h_d08EbvpMB6pGQG9OKCVGm5jHij32M",
    authDomain: "therapy-d027b.firebaseapp.com",
    projectId: "therapy-d027b",
    storageBucket: "therapy-d027b.firebasestorage.app",
    messagingSenderId: "602332150906",
    appId: "1:602332150906:web:63479c4487e1e48cde4fc3",
    measurementId: "G-4E7KWT2XS1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Sign in with Apple (requires Apple Developer configuration for production)
// Apple Sign-In removed for now (requires Apple Developer Program)

export default app;