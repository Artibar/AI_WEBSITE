import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/signup.css'
import { useAuth } from '../hooks/useAuth.js'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const { createSignup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSignup = async (event) => {
    event.preventDefault()
    console.log('Signup submitted', { name, email, password })

    try {
      const res = await createSignup({ name, email, password })
      console.log('Signup response:', res)

      if (res && res.success) {
        navigate('/login')
      }
    } catch (error) {
      console.error('Error during signup:', error)
    }
  }

  return (
    <main className='signup-page'>
      <section className='signup-panel'>
        <header className='signup-header'>
          <h2>Join GenWeb<span className='brand-highlight'>Ai</span></h2>
          <p>Create an account and generate responsive websites instantly.</p>
        </header>

        <form onSubmit={handleSignup} className='signup-form'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
            required
          />

          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />

          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />

          <button type='submit' className='button primary-button' navigate='/login'>Sign Up</button>
        </form>

        <p className='signup-footer'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </section>
    </main>
  )
}

export default Signup
