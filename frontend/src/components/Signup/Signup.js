import React, { useState, useRef } from 'react'
import styles from './Signup.module.css'
import axios from 'axios'

const Signup = () => {
    const [ signUp, setSignUp ] = useState(false)
    const [ userJSON, setUserJSON ] = useState({})
    const [ passCorrect, setPassCorrect ] = useState(false)
    const [ passStyle, setPassStyle ] = useState({
        classes: 'form-control',
        classMsg: 'form-text',
        border: '1px solid #ced4da'
    })
    const [ rePassStyle, setRePassStyle ] = useState({
        classes: 'form-control',
        classMsg: 'form-text',
        border: '1px solid #ced4da'
    })
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

        if (passCorrect) {
            if (password.current.value === repeatPassword.current.value) {
                axios.post('/signup', user)
                .then(res => {
                    setUserJSON(res)
                    setSignUp(true)
                })
                .catch(e => console.error("There was an error", e))
            } else {
                setRePassStyle({
                    classes: 'form-control text-danger',
                    classMsg: 'form-text text-danger',
                    border: '1px solid red'
                })
            }
        } else {
            setPassStyle({
                classes: 'form-control text-danger',
                classMsg: 'form-text text-danger',
                border: '1px solid red'
            })
        }
    }

    const pass = (e) => {
        let passField = e.target.value
        if (passField.length >= 8) {
            // eslint-disable-next-line
            const regex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
            if (regex.test(passField)) {
                setPassCorrect(true)
                setPassStyle({
                    classes: 'form-control text-success',
                    classMsg: 'form-text text-success',
                    border: '1px solid #ced4da'
                })
            } else {
                setPassCorrect(false)
                setPassStyle({
                    classes: 'form-control text-danger',
                    classMsg: 'form-text text-danger',
                    border: '1px solid #ced4da'
                })
            }
        }
        else if (passField.length >= 1 && passField.length < 8) {
            setPassCorrect(false)
            setPassStyle({
                classes: 'form-control text-danger',
                classMsg: 'form-text text-danger',
                border: '1px solid #ced4da'
            })
        } else {
            setPassCorrect(false)
            setPassStyle({
                classes: 'form-control',
                classMsg: 'form-text',
                border: '1px solid #ced4da'
            })
        }
    }

    const repass = (e) => {
        let rePassField = e.target.value
        if (password.current.value === repeatPassword.current.value) {
            if (rePassField.length === 0) {
                setRePassStyle({
                    classes: 'form-control',
                    classMsg: 'form-text',
                    border: '1px solid #ced4da'
                })
            } else {
                setRePassStyle({
                    classes: 'form-control text-success',
                    classMsg: 'form-text text-success',
                    border: '1px solid #ced4da'
                })
            }
        } else {
            setRePassStyle({
                classes: 'form-control text-danger',
                classMsg: 'form-text text-danger',
                border: '1px solid #ced4da'
            })
        }
    }

    if (signUp) {
        return (
            <h1>Welcome {userJSON.data.firstName}!</h1>
        )
    }

    return (
        <div className={`container`}>
        <h2 className={styles.title}>Get started with us!</h2>
        <form className={`row ${styles.form}`} style={{margin: '0'}} onSubmit={signup}>
            <div className="row g-3">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="First name" ref={firstName} aria-describedby="firstNameHelpBlock" required />
                    <div id='firstNameHelpBlock' className="form-text">
                        For example: <em> John</em>
                    </div>
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Last name" ref={lastName} aria-describedby="lastNameHelpBlock" required />
                    <div id='lastNameHelpBlock' className="form-text">
                        For example: <em> Doe</em>
                    </div>
                </div>
                <div className="col-md-6">
                    <input type="username" className="form-control" placeholder="Username" ref={userName} aria-describedby="userNameHelpBlock" required />
                    <div id='userNameHelpBlock' className="form-text">
                        For example: <em> Username123</em>
                    </div>
                </div>
                <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Email" ref={email} aria-describedby="emailHelpBlock"  required />
                    <div id='emailHelpBlock' className="form-text">
                        For example: <em> username@company.com</em>
                    </div>
                </div>
                <div className="col-md-6">
                    <input type="password" className={passStyle.classes} style={{border: passStyle.border}} placeholder="Password" ref={password} onChange={pass} aria-describedby="passwordHelpBlock" required />
                    <div id='passwordHelpBlock' className={passStyle.classMsg}>
                        Use 8 or more characters with a combination of letters, numbers, and symbols.
                    </div>
                </div>
                <div className="col-md-6">
                    <input type="password" className={rePassStyle.classes} style={{border: rePassStyle.border}} placeholder="Repeat password" ref={repeatPassword} onChange={repass} aria-describedby="rePasswordHelpBlock" required />
                    <div id='rePasswordHelpBlock' className={rePassStyle.classMsg}>
                        Make sure you have entered the same password in the field above.
                    </div>
                </div>
                <input type="submit" value="Sign Up" className="btn btn-success" />
            </div>
        </form>
    </div>
    )
}

export default Signup
