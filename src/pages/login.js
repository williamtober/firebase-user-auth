import React, { useState } from 'react'
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

export const Login = () => {

    // react hooks to localize input state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [profilePic, setProfilePic] = useState('')
    // toggles if user wants to register
    const [newUser, setNewUser] = useState(false)
    const dispatch = useDispatch()


    const loginToApp = (e) => {
        e.preventDefault()
        // firebase sign in || logic for validation
        signInWithEmailAndPassword(auth, email, password)
        // authorized user object returned from FB here 
        .then((userAuth) => {
            console.log('logging in : ', userAuth)
            dispatch(login({
                email : userAuth.user.email,
                uid : userAuth.user.uid,
                displayName : userAuth.user.displayName,
                photoUrl : userAuth.user.photoURL
            }))
        }).catch(err => alert(err))
    }

    const register = () => {

        // RETURN ALERT IF NO NAME FOUND
        if(!name) {
            
            return alert('Please enter a full name')
        }
        // CREATE USER IF NAME FOUND
        createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            console.log('creating user with email and password : ', userAuth)
            updateProfile(userAuth.user, {
                displayName : name,
                photoURL : profilePic
            })
            .then(
                dispatch(
                    login({email : userAuth.user.email,
                    uid : userAuth.user.uid,
                displayName : profilePic
            })))
            .catch((err) => {
                console.log("user can't be updated : ", err)
            })
        })
        .catch(err => {
            console.log('ERROR : ', err)
        })
    }

    const registerStyle = !newUser ? {display: 'none'} : {display: 'flex'}

    return (
        <div className='flex flex-col items-center justify-center w-[100vw] h-[100vh]' style={{ background: 'url("https://images.unsplash.com/photo-1575742306745-6c556a04ee84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")', backgroundSize: 'cover', backgroundPosition: 'top'}}>
            
            <form className='rounded-xl w-[400px] h-[600px] flex flex-col items-start justify-center gap-y-8 p-10 bg-[#f4f5f7] shadow border-0'>
                <h2 className='w-full text-center mb-10 text-4xl font-bold text-gray-500'>User {!newUser ? <span>Login</span> : <span>Registration</span>}</h2>
                <div className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full hidden items-center justify-start'>Email</label>
                    <input
                        required 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                        placeholder='Email'
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full hidden items-center justify-start'>Password</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow w-full'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                    />
                </div>
                <div style={registerStyle} className='w-full flex flex-row align-center justify-between'>
                    <label className='font-bold text-black h-full hidden items-center justify-start'>Name</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow w-full'
                        placeholder='Full Name'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div style={registerStyle} className="w-full flex-row align-center justify-between">
                    <label className='font-bold text-black h-full hidden items-center justify-start'>Profile Picture</label>
                    <input 
                        className='rounded py-1 flex items-center justify-start pl-2 focus:shadow w-full'
                        placeholder='URL to Profile Picture'
                        type='text'
                        value={profilePic}
                        onChange={e => setProfilePic(e.target.value)}
                    />
                </div>
                <div className='w-full mt-5 flex flex-col justify-center align-center'>
                    <input style={newUser ? {display: 'none'} : {display: 'flex'}} onClick={loginToApp} className='bg-blue-500 text-gray-50 font-semibold px-full py-2 rounded justify-center hover:cursor-pointer' type='button' value='Sign In'>
                    </input>
                    {/* use hooks to hide other values, until user clicks on register. */}
                    <span style={newUser ? {display: 'none'} : {display: 'flex'}} className='w-full mt-8 mb-2 text-center justify-center'>Not a User? <span className='text-blue-400 ml-1 hover:cursor-pointer' onClick={e => setNewUser(!newUser)}>Register Today. </span></span>
                    <input style={registerStyle} onClick={register} className='bg-blue-500 text-gray-50 font-semibold py-2 rounded justify-center hover:cursor-pointer' type='button' value='Register'>
                        
                    </input>
                    <span style={!newUser ? {display: 'none'} : {display: 'flex'}} className='w-full mt-8 mb-2 text-center justify-center'>Already Registered? <span className='text-blue-400 ml-1 hover:cursor-pointer' onClick={e => setNewUser(!newUser)}>Login Here. </span></span>
                </div>
                
            </form>
        </div>
        
        
    )
}

export default Login