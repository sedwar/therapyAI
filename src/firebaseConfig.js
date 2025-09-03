import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { config } from './config/environment';

// Firebase configuration from centralized config
const firebaseConfig = config.firebase;

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ 
  prompt: 'select_account',
  access_type: 'online',
  include_granted_scopes: 'true'
});

// Add scopes for better user experience
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Sign in with Apple (requires Apple Developer configuration for production)
// Apple Sign-In removed for now (requires Apple Developer Program)

export default app;