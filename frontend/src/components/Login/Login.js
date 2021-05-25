import React from 'react'
import styles from './Login.module.css'

const Login = () => {
    return (
        <div>
            <h2 className={styles.title}>Do you have an account?</h2>
            <br/>
            <form>
                <input className="form-control" type="text" placeholder="User" required /><br/>
                <input className="form-control" type="text" placeholder="Password" required /><br/>
                <input className={`btn btn-primary ${styles.btn}`} type="submit" value="Log In" />
            </form>
        </div>
    )
}

export default Login
