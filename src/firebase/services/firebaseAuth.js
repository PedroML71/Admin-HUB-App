import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../config";

const auth = getAuth(app);

const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.message);
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error.message);
  }
};

const authObserver = (setUser, setIsLoading) => {
  onAuthStateChanged(auth, async (user) => {
    setIsLoading(true);

    if (user) {
      const token = await auth.currentUser.getIdToken();

      const response = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_REACT_APP_DEV_API_URL
            : import.meta.env.VITE_REACT_APP_PROD_API_URL
        }/usuarios/signin`,
        {
          mode: "cors",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        console.log({ ...responseData.data.usuario });

        setUser({ ...responseData.data.usuario });
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setIsLoading(false);
  });
};

const sendResetPasswordEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    alert(error.message);
  }
};

const getToken = async () => {
  const token = await auth?.currentUser?.getIdToken();

  return token;
};

export {
  loginUser,
  logoutUser,
  authObserver,
  sendResetPasswordEmail,
  getToken,
};
