import React from 'react'

/**
 * COMPONENT
 */
const AuthForm = () => {
  return (
    <div>
      <div className="container">
        <div id="login-content">
          <h1 className="login-title">Visualize Your Taste in Music</h1>
          <a href="/auth/spotify/login/" className="btn btn-primary btn-login">
            <button className="login-button" type="submit">
              LOG IN WITH SPOTIFY
            </button>
          </a>
        </div>
        <span className="login-background" />
      </div>
    </div>
  )
}

export default AuthForm
