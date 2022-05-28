import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice'
import { auth, onAuthStateChanged } from './firebase'

// components
import Login from './pages/login'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if(userAuth) {
        // if user is logged in lets send that data to redux, that will store the user data in state
        // lets store some basic information for now
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
    
  }) 
  return (
    <div className="App">

      {/* Header Section goes here */}

      {/* is user logged in? */}
      {!user ? (
        <Login />
      ) : (
        // display the app only to authorized users
        <div className=''>
          {/*  rest of the app would go here */}
        </div>
      )}
    </div>
  );
}

export default App;
