import { useEffect, useState } from 'react';
import { authConfig } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    return function () {
      setIsCancelled(true);
    };
  }, []);

  const signup = (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    let user = null;

    authConfig
      .createUserWithEmailAndPassword(authConfig.getAuth(), email, password)
      .then((res) => {
        if (!res) {
          throw new Error('Could not signup sorry.');
        }

        user = res.user;

        return authConfig.updateProfile(res.user, {
          displayName,
        });
      })
      .then(() => {
        dispatch({
          type: 'LOGIN',
          payload: user,
        });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setIsPending(false);
          setError(err.message);
        }
      });
  };

  return { error, isPending, signup };
};
