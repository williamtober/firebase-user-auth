import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice'
import { auth, onAuthStateChanged } from './firebase'

// page components
import Login from './pages/login'
import Navbar from './pages/navbar'
import Home from './pages/home'
import Account from './pages/account'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if(userAuth) {
        // if user is logged in lets send that data to redux, that will store the user data in state
        // lets store some basic information for now
        console.log('user state : ', user)
        console.log('userAUth  : ', userAuth)
        dispatch(
          login({
            email : userAuth.email,
            uid : userAuth.uid,
            displayName : userAuth.displayName,
            photoUrl : userAuth.photoURL
          })
        )
        
      } else {
        dispatch(logout())
      }
    })
    console.log('page rendered');
  }, []) 
  return (
    <div className='w-[100vw] h-[100vh] overflow-hidden'>
      <Navbar user={user} />
      {!user ? <Login /> : <Account user={user} />}
    </div>
      
    
  );
}

export default App;
