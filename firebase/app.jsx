import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import { doc, getDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";

function App() {
  const { user, login, logout } = useAuth();
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    if (user) fetchUserCollection(user.uid);
  }, [user]);

  const fetchUserCollection = async (uid) => {
    const docRef = doc(db, "collections", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) setCollection(docSnap.data().movies || []);
    else {
      await setDoc(docRef, { movies: [] });
      setCollection([]);
    }
  };

  return (
    <div>
      {!user ? (
        <button onClick={login}>Login with Google</button>
      ) : (
        <div>
          <p>Hi, {user.displayName}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
