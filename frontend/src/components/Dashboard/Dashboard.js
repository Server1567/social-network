import React from 'react'
import logo from './logo.svg'
import styles from './Dashboard.module.css'

const Dashboard = ({ user }) => {
    return (
        <div className={styles.App}>
            <header className={styles.AppHeader}>
                <img src={logo} className={styles.AppLogo} alt="logo" />
                <h2>Welcome { user.firstName }</h2>
                <h4>Social Network is in Development!</h4>
                <a className={styles.AppLink}
                    href="https://github.com/Server1567/social-network"
                    target="_blank" rel="noopener noreferrer">
                    Fork on GitHub
                </a>
            </header>
        </div>
    )
}

export default Dashboard
