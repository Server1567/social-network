import React from 'react'

const Dashboard = (props) => {
    return (
        <div>
            <h1>Welcome {props.user.data.firstName}!</h1>
        </div>
    )
}

export default Dashboard
