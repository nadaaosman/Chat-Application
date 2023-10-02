import React from 'react';
import { useState } from 'react';
import Add from '../images/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      //Create user
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          setErr(true);
        },
        () => {
          console.log('ref', uploadTask.snapshot.ref);

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //Update profile
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL
            });
            //set to the firestore
            // users the collection name
            //create user on firestore

            await setDoc(doc(db, 'users', response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });
            //add new collection for chatusers
            await setDoc(doc(db, 'userChats', response.user.uid), {});
            navigate('/');
          });
        }
      );
    } catch (error) {
      console.log('hoda');
      console.log('error', error.message);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Leso Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="display name"
          ></input>
          <input
            type="email"
            placeholder="email"
          ></input>
          <input
            type="password"
            placeholder="password"
          ></input>
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img
              src={Add}
              alt="ss"
            />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong </span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
