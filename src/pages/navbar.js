import React from "react";
import { useDispatch, userSelector } from "react-redux";
import { auth } from '../firebase'
import { logout } from '../features/userSlice'

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const dispatch = useDispatch()

  const logMeOut = () => {
    // update state with redux
    dispatch(logout())
    // let firebase know that we're outta here
    auth.signOut()
  }
  return (
    <>
      <nav className="w-[100vw] h-[7vh] flex flex-wrap items-center justify-between px-2 py-3 bg-blue-600">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              Clutch Cam
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            {props.user ? 
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Account</span>
                </a>
              </li>

              <li className="nav-item" onClick={logMeOut}>
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Logout</span>
                </a>
              </li>
              
            </ul> : null }
            
          </div>
        </div>
      </nav>
    </>
  );
}