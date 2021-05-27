import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.css'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import PubSub from 'pubsub-js'

const App = () => {
    const [ user, setUser ] = useState({})
    const [ register, setRegister ] = useState(false)
    const signup = () => setRegister(true)

    useEffect(() => {
        PubSub.subscribe('user', (err, data) => {
            setUser(data)
        })
        return () => {
            PubSub.unsubscribe('user')
        }
    }, [])

    if (Object.entries(user).length === 0) {
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
    } else {
        return (
            <Dashboard user={user} />
        )
    }

}

export default App
