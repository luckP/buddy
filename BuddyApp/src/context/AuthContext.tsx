import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut, 
  User 
} from 'firebase/auth';
import { api } from '../services/api';
import { Alert } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (authUser) => {
      if (authUser) {
        const token = await authUser.getIdToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /** 🔹 Handle Firebase Login */
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error: any) {
      handleAuthError(error);
      throw error;
    }
  };

  /** 🔹 Handle Firebase Registration */
  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error: any) {
      handleAuthError(error);
      throw error;
    }
  };

  /** 🔹 Handle Password Reset */
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert("Success", "Password reset email sent.");
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  /** 🔹 Handle Logout */
  const logout = async () => {
    await signOut(FIREBASE_AUTH);
    setUser(null);
  };

  /** 🔹 Centralized Error Handling */
  const handleAuthError = (error: any) => {
    // console.error("Firebase Auth Error:", error);
  
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert("Login Failed", "The email format is incorrect.");
        break;
      case 'auth/user-not-found':
        Alert.alert("Login Failed", "No account found with this email.");
        break;
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        Alert.alert("Login Failed", "Incorrect email or password.");
        break;
      case 'auth/email-already-in-use':
        Alert.alert("Registration Failed", "This email is already registered.");
        break;
      case 'auth/weak-password':
        Alert.alert("Registration Failed", "Password should be at least 6 characters.");
        break;
      case 'auth/too-many-requests':
        Alert.alert("Login Failed", "Too many failed login attempts. Try again later.");
        break;
      default:
        Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
