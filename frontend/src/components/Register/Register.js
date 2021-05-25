import React from 'react'
import styles from './Register.module.css'
import Signup from './../Signup'

const Register = () => {
    return (
        <div className={styles.getStarted}>
            <h1 className={styles.title}>
                Welcome to the <span className={styles.brand}>Social Network</span>
            </h1>
            <br/>
            <Signup />
        </div>
    )
}

export default Register
