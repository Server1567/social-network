import React, { useState, useRef, useContext } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import styles from './Login.module.css'
import axios from 'axios'
import { StoreContext } from './../../StoreContext'

const Login = () => {
    const [ errLogin, setErrLogin ] = useState({ display: 'none' })
    const debounced = useDebouncedCallback(() => setErrLogin({ display: 'none' }), 3000)
    let userName = useRef()
    let pass = useRef()

    const { setUser } = useContext(StoreContext)

    const login = (e) => {
        e.preventDefault()
        axios.post('/login', {
            userName: userName.current.value,
            password: pass.current.value
        })
            .then(res => {
                if (res.data.logged) {
                    setUser(res.data.user)
                } else {
                    setErrLogin({ display: 'block' })
                    debounced()
                }
            })
            .catch(e => console.error("There was an error ", e))
    }

    return (
        <div>
            <h2 className={styles.title}>Do you have an account?</h2>
            <br/>
            <form onSubmit={login}>
                <center style={{marginBottom: '7px', display: errLogin.display}}>
                    <span style={{fontWeight: 'bold'}}>
                        <em className="text-danger">Username and password incorrect</em>
                    </span>
                </center>
                <input className="form-control" type="text" placeholder="User" ref={userName} required /><br/>
                <input className="form-control" type="password" placeholder="Password" ref={pass} required /><br/>
                <input className={`btn btn-primary ${styles.btn}`} type="submit" value="Log In" />
            </form>
        </div>
    )
}

export default Login
