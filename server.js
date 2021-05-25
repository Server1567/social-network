const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

// Midlewares
app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(express.json())

// Getting '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
})

// Posting 'signup'
app.post('/signup', (req, res, next) => {
    try {
        // Validate if the client isn't sending data.
        if (Object.entries(req.body).length === 0) {
            return res.status(400).json({ message: "There are not data" })
        }

        let user = req.body
        let jsonUser = JSON.stringify(user)
        // Save on JSON Data Base
        if (!fs.existsSync('db.json')) {
            fs.writeFile('db.json', jsonUser, (err) => {
                if (err) throw err;
                return res.status(200).json(user)
            })
        } else {
            // To read file, modify it and save it.
        }
    } catch (e) {
        return res.status(404).json({message: 'Error 404 Not Found', error: e})
    }
})

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Social Network Running at Port 8080')
})
