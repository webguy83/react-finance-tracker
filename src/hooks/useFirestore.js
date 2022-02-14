// @ts-nocheck
import { useEffect, useReducer, useState } from 'react';
import { collection, db, addDoc } from '../firebase/config';

const initState = {
  document: null,
  isPending: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, error: null };
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, error: null };
    case 'ERROR':
      return { isPending: false, document: null, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(reducer, initState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNoCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const addedDoc = await addDoc(collection(db, col), doc);
      dispatchIfNoCancelled({ type: 'ADDED_DOCUMENT', payload: addedDoc });
    } catch (err) {
      dispatchIfNoCancelled({ type: 'ERROR', payload: err.message });
    }
  };
  const deleteDocument = (id) => {};

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
