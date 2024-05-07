import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';

export function useFirestoreSub(query, transform = (data) => data) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setError(null);
      return undefined;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        try {
          let processedData = snapshot.docs
            ? snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            : { id: snapshot.id, ...snapshot.data() };

          if (transform) {
            processedData = transform(processedData);
          }

          setData(processedData);
          setLoading(false);
        } catch (e) {
          console.error('Error processing snapshot:', e);
          setError(e);
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error subscribing to Firestore:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { data, loading, error };
}
