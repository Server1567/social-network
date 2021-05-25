import React, { useState, useRef } from 'react'
import styles from './Signup.module.css'
import axios from 'axios'

const Signup = () => {
    const [ signUp, setSignUp ] = useState(false)
    const [ userJSON, setUserJSON ] = useState({})
    // Refs from Inputs
    const firstName = useRef()
    const lastName = useRef()
    const userName = useRef()
    const email = useRef()
    const password = useRef()
    const repeatPassword = useRef()

    const signup = (e) => {
        e.preventDefault()
        var user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            userName: userName.current.value,
            email: email.current.value,
            password: password.current.value
        }

        axios.post('/signup', user)
            .then(res => {
                setUserJSON(res)
                setSignUp(true)
            })
            .catch(e => console.error("There was an error", e))
    }

    if (signUp) {
        return (
            <h1>Welcome {userJSON.data.firstName}!</h1>
        )
    }

    return (
        <div className={`container`}>
        <h2 className={styles.title}>Get started with us!</h2>
        <form className={`row ${styles.form}`} style={{margin: '0'}}>
            <div className="row g-3">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="First name" ref={firstName} required />
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Last name" ref={lastName} required />
                </div>
                <div className="col-md-6">
                    <input type="username" className="form-control" placeholder="Username" ref={userName} required />
                </div>
                <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Email" ref={email} required />
                </div>
                <div className="col-md-6">
                    <input type="password" className="form-control" placeholder="Password" ref={password} required />
                </div>
                <div className="col-md-6">
                    <input type="password" className="form-control" placeholder="Repeat password" ref={repeatPassword} required />
                </div>
                <input type="submit" value="Sign Up" className="btn btn-success" onClick={signup} />
            </div>
        </form>
    </div>
    )
}

export default Signup
