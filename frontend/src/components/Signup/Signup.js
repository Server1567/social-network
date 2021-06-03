import React, { useReducer, useRef, useContext } from 'react'
import styles from './Signup.module.css'
import { StoreContext } from './../../StoreContext'
import { initialState, reducer } from './reducer'
import axios from 'axios'

const Signup = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const { setUser } = useContext(StoreContext)
    // Refs from Inputs
    const [ firstName, lastName, userName, email, password, repeatPassword ] =
    [ useRef(), useRef(), useRef(), useRef(), useRef(), useRef() ]

    const signup = (e) => {
        e.preventDefault()
        var user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            userName: userName.current.value,
            email: email.current.value,
            password: password.current.value
        }

        if (state.passCorrect) {
            if (password.current.value === repeatPassword.current.value) {
                axios.post('/signup', user)
                    .then(res => {
                        dispatch({ type: 'SET_USERJSON', payload: res })
                    })
                    .catch(e => console.error("There was an error", e))
            } else {
                dispatch({ type: 'SET_RE_PASS_STYLE_DANGER' })
            }
        } else {
            dispatch({ type: 'SET_PASS_STYLE_DANGER' })
        }
    }

    const pass = (e) => {
        let passField = e.target.value
        if (passField.length >= 8) {
            // eslint-disable-next-line
            const regex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
            // Validate that the password meets the requirements
            if (regex.test(passField)) { dispatch({ type: 'SET_PASS_STYLE_CORRECT' }) }
            else { dispatch({ type: 'SET_PASS_STYLE_INCORRECT' }) }
        }
        else if (passField.length >= 1 && passField.length < 8) {
            dispatch({ type: 'SET_PASS_STYLE_INCORRECT' })
        } else {
            dispatch({ type: 'SET_PASS_INCORRECT' })
            dispatch({ type: 'SET_PASS_STYLE' })
        }
    }

    const repass = (e) => {
        let rePassField = e.target.value
        if (password.current.value === repeatPassword.current.value) {
            // Validate that the password is the same as the one in the previous field
            if (rePassField.length === 0) { dispatch({ type: 'SET_RE_PASS_STYLE' }) }
            else { dispatch({ type: 'SET_RE_PASS_STYLE_CORRECT' }) }
        } else {
            dispatch({ type: 'SET_RE_PASS_STYLE_INCORRECT' })
        }
    }

    if (state.signUp) { setUser(state.userJSON.data) }

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
                        <input type="text" className="form-control" placeholder="Username" ref={userName} aria-describedby="userNameHelpBlock" required />
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
                        <input type="password" className={state.passStyleClasses} style={{border: state.passStyleBorder}} placeholder="Password" ref={password} onChange={pass} aria-describedby="passwordHelpBlock" required />
                        <div id='passwordHelpBlock' className={state.passStyleClassMsg}>
                            Use 8 or more characters with a combination of letters, numbers, and symbols.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <input type="password" className={state.rePassStyleClasses} style={{border: state.rePassStyleBorder}} placeholder="Repeat password" ref={repeatPassword} onChange={repass} aria-describedby="rePasswordHelpBlock" required />
                        <div id='rePasswordHelpBlock' className={state.rePassStyleClassMsg}>
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
