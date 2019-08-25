import React from 'react'

/**
 * COMPONENT
 */
const AuthForm = () => {
  return (
    <div>
      <div className="container">
      <div id="login">
        <h1>Log in below</h1>
          <a href="/auth/spotify/login/" className="btn btn-primary btn-login">
          <button type='submit'>
            Log in with Spotify
            </button>
          </a>
      </div>
    </div>
    </div>
  )
}

export default AuthForm
