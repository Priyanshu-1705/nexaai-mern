import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Loading = () => {

  const navigate = useNavigate()
  const { fetchUser } = useAppContext()

  useEffect(() => {

    const verifyPayment =
      async () => {

        try {

          // wait for updated credits
          await fetchUser();

          // small delay for smoother UX
          setTimeout(() => {
            navigate("/");
          }, 1000);

        } catch (error) {
          console.log(error);
        }
      };

    verifyPayment();

  }, []);
  return (
    <div className='bg-gradient-to-b from-[#531B81] to-[#29184B] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl'>
      <div className='w-10 h-10 rounded-full border-3 border-white border-t-transparent animate-spin'>

      </div>
    </div>
  )
}

export default Loading
