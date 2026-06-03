import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import { useAppContext }
  from '../context/AppContext.jsx';

import { assets }
  from '../assets/assets.js';

import Message
  from './Message.jsx';

import toast
  from 'react-hot-toast';

const ChatBox = () => {

  const containerRef =
    useRef(null);

  const {
    selectedChat,
    theme,
    setSelectedChat,
    user,
    axios,
    token,
    setUser
  } = useAppContext();

  const [messages,
    setMessages] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [prompt,
    setPrompt] =
    useState('');

  const [mode,
    setMode] =
    useState('text');

  const [isPublished,
    setIsPublished] =
    useState(false);

  const onSubmit =
    async (e) => {

      try {
        e.preventDefault();

        // Login check
        if (!user) {
          return toast.error(
            'Please login to chat'
          );
        }

        // Chat selected check
        if (
          !selectedChat?._id
        ) {
          return toast.error(
            'Please select a chat'
          );
        }

        const trimmedPrompt =
          prompt.trim();

        // Empty prompt check
        if (!trimmedPrompt)
          return;

        setLoading(true);
        setPrompt('');

        // User message
        const userMessage =
        {
          role: 'user',
          content:
            trimmedPrompt,
          timestamp:
            Date.now(),
          isImage: false
        };

        // Show instantly
        setMessages(prev => [
          ...prev,
          userMessage
        ]);

        // API request
        const { data } =
          await axios.post(
            `/api/message/${mode}`,
            {
              chatId:
                selectedChat._id,
              prompt:
                trimmedPrompt,
              isPublished
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        if (data.success) {

          setMessages(prev => {

            const updated =
              [
                ...prev,
                data.reply
              ];

            // Sync selected chat
            setSelectedChat(
              prevChat => ({
                ...prevChat,
                messages:
                  updated
              })
            );

            return updated;
          });

          // Deduct credit
          setUser(prev => ({
            ...prev,
            credit:
              prev.credit -
              (
                mode ===
                  'image'
                  ? 2
                  : 1
              )
          }));

        } else {
          toast.error(
            data.message
          );
        }

      } catch (error) {

        toast.error(
          error.response
            ?.data
            ?.message ||
          error.message
        );

      } finally {
        setLoading(false);
      }
    };

  // Load chat messages
  useEffect(() => {
    if (selectedChat) {
      setMessages(
        selectedChat
          .messages || []
      );
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  // Auto scroll
  useEffect(() => {
    if (
      containerRef.current
    ) {
      containerRef.current
        .scrollTo({
          top:
            containerRef
              .current
              .scrollHeight,
          behavior:
            'smooth'
        });
    }
  }, [messages]);

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

      {/* Chat Messages */}
      <div
        ref={containerRef}
        className='flex-1 mb-5 overflow-y-scroll'
      >

        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>

            <img
              src={
                theme ===
                  'dark'
                  ? assets.logo_full
                  : assets.logo_full_dark
              }
              alt=""
              className='w-full max-w-56 sm:max-w-68'
            />

            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me anything.
            </p>

          </div>
        )}

        {messages.map(
          (
            message,
            index
          ) => (
            <Message
              key={index}
              message={
                message
              }
            />
          )
        )}

        {/* Loading dots */}
        {loading && (
          <div className='flex items-center gap-1.5 my-4'>

            <div className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce'></div>

            <div className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce'></div>

            <div className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce'></div>

          </div>
        )}

      </div>

      {/* Publish image toggle */}
      {mode ===
        'image' && (
          <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>

            <p className='text-xs'>
              Publish Generated
              Image to
              Community
            </p>

            <input
              type="checkbox"
              className='cursor-pointer'
              checked={
                isPublished
              }
              onChange={(
                e
              ) =>
                setIsPublished(
                  e.target
                    .checked
                )
              }
            />

          </label>
        )}

      {/* Prompt Input */}
      <form
        onSubmit={
          onSubmit
        }
        className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'
      >

        <select
          value={mode}
          onChange={(
            e
          ) =>
            setMode(
              e.target
                .value
            )
          }
          className='text-sm pl-3 pr-2 outline-none bg-transparent'
        >

          <option
            className='dark:bg-purple-900'
            value="text"
          >
            Text
          </option>

          <option
            className='dark:bg-purple-900'
            value="image"
          >
            Image
          </option>

        </select>

        <input
          type="text"
          value={prompt}
          onChange={(
            e
          ) =>
            setPrompt(
              e.target
                .value
            )
          }
          placeholder='Type your prompt here...'
          className='flex-1 w-full text-sm outline-none bg-transparent'
        />

        <button
          disabled={
            loading
          }
        >
          <img
            src={
              loading
                ? assets.stop_icon
                : assets.send_icon
            }
            alt=""
            className='w-8 cursor-pointer'
          />
        </button>

      </form>
    </div>
  );
};

export default ChatBox;