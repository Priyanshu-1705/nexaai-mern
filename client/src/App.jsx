import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox.jsx'
import Credits from './pages/Credits.jsx'
import Community from './pages/Community.jsx'
import { assets } from './assets/assets.js'
import './assets/prism.css'
import Loading from './pages/Loading.jsx'
import { useAppContext } from './context/AppContext.jsx'
import Login from './pages/Login.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const {
    loadingUser,
    user
  } = useAppContext();

  const [isMenuOpen,
    setIsMenuOpen] =
    useState(false);

  const {
    pathname
  } =
    useLocation();

  // Only for payment success page
  if (
    pathname ===
    '/loading'
  ) {
    return <Loading />;
  }

  // General app loading
  if (
    loadingUser
  ) {
    return (
      <div className='flex items-center justify-center h-screen dark:bg-black text-white'>
        <div className='w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin'>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />

      {!isMenuOpen && (
        <img
          src={
            assets.menu_icon
          }

          className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert'

          onClick={() =>
            setIsMenuOpen(
              true
            )
          }
        />
      )}

      {user ? (
        <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>

          <div className='flex h-screen w-screen'>

            <Sidebar
              isMenuOpen={
                isMenuOpen
              }

              setIsMenuOpen={
                setIsMenuOpen
              }
            />

            <Routes>
              <Route
                path='/'
                element={
                  <ChatBox />
                }
              />

              <Route
                path='/credits'
                element={
                  <Credits />
                }
              />

              <Route
                path='/community'
                element={
                  <Community />
                }
              />
            </Routes>

          </div>

        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export default App