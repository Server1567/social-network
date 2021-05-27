import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.css'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
    const [ register, setRegister ] = useState(false)
    const signup = () => setRegister(true)

    if (!register) {
        return (
            <div className={styles.getStarted}>
                <h1 className={styles.title}>
                    Welcome to the <span className={styles.brand}>
                        <a href="/" style={{
                                textDecoration: 'none',
                                color: 'magenta'
                            }}>Social Network</a>
                    </span>
                </h1>
                <br/>
                <Login />
                <br/>
                <span><em>or </em>create a new account!</span>
                <br/><br/>
                <button className={`btn btn-success ${styles.register}`} onClick={signup}>Sign Up</button>
            </div>
        )
    }

    return (
        <Register />
    )
}

export default App
