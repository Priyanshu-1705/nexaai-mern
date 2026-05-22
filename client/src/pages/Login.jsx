import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050816] overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] bg-purple-700/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] bg-fuchsia-700/20 blur-[120px] rounded-full" />

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-[28px]
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(0,0,0,0.4)]
        p-8 sm:p-10"
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-bold text-violet-500
            drop-shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          >
            NexaAI
          </h1>

          <p className="mt-3 text-gray-400 text-lg">
            {state === 'login'
              ? 'Continue your AI journey'
              : 'Start chatting with NexaAI'}
          </p>
        </div>

        {/* Name */}
        {state === 'register' && (
          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">
              Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-white/10
              bg-white/[0.04]
              px-4 py-3 text-white placeholder-gray-500
              outline-none transition-all duration-300
              focus:border-violet-500
              focus:ring-4 focus:ring-violet-500/20"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-2">
            Email
          </label>

          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-white/10
            bg-white/[0.04]
            px-4 py-3 text-white placeholder-gray-500
            outline-none transition-all duration-300
            focus:border-violet-500
            focus:ring-4 focus:ring-violet-500/20"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2">
            Password
          </label>

          <input
            type="password"
            required
            autoComplete={
              state === 'login'
                ? 'current-password'
                : 'new-password'
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-white/10
            bg-white/[0.04]
            px-4 py-3 text-white placeholder-gray-500
            outline-none transition-all duration-300
            focus:border-violet-500
            focus:ring-4 focus:ring-violet-500/20"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl
          bg-gradient-to-r from-violet-600 to-fuchsia-600
          hover:scale-[1.02]
          active:scale-[0.98]
          transition-all duration-300
          text-white font-semibold text-lg
          shadow-lg shadow-violet-900/30 cursor-pointer"
        >
          {state === 'login'
            ? 'Login'
            : 'Create Account'}
        </button>

        {/* Toggle Auth */}
        <p className="mt-6 text-center text-gray-400">
          {state === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}

          <span
            onClick={() =>
              setState(
                state === 'login'
                  ? 'register'
                  : 'login'
              )
            }
            className="ml-2 text-violet-500 font-semibold
            cursor-pointer hover:text-violet-400 transition-colors"
          >
            {state === 'login'
              ? 'Sign up'
              : 'Login'}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login