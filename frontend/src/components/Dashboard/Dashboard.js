import React from 'react'

const Dashboard = (props) => {
    return (
        <div className="card text-center" style={{margin: 'auto'}}>
            <div className="card-header">
                Developer Message
            </div>
            <div className="card-body" style={{padding: '50px 0'}}>
                <h5 className="card-title">Welcome {props.user.firstName}</h5>
                <p className="card-text" style={{padding: '0 300px'}}>
                    This App is a test model to check the operation of a Social Network under a database of a simple JSON file. The test model has failed, but if you can figure out how to create a correct and more efficient test model you can apply for a fork in the GitHub repository of this project.
                </p>
                <a href="https://github.com/Server1567/social-network"
                    className="btn btn-primary"
                    style={{
                        backgroundColor: '#24292e',
                        borderColor: '#24292e'}}>
                    Fork on GitHub
                </a>
            </div>
            <div className="card-footer text-muted">
                A test by Server1567
            </div>
        </div>
    )
}

export default Dashboard
