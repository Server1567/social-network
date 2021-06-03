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

// Posting 'loging'
app.post('/login', (req, res, next) => {
    try {
        // Validate if the client isn't sending data.
        if (Object.entries(req.body).length === 0) {
            return res.status(400).json({ message: "There are not data" })
        }

        let user = req.body
        // To read the file
        const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))
        if (data instanceof Array) {
            // If it's an Array, do something
             const log = data.filter(json => user.userName === json.userName && user.password === json.password)
             if (log.length === 1) {
                 return res.status(200).json({ logged: true, user: log[0] })
             }

             return res.status(200).json({ logged: false })
        } else {
            // If just has one user, do something
            if (user.user === data.userName && user.password === data.password) {
                return res.status(200).json({ logged: true, user: data })
            }

            return res.status(200).json({ logged: false })
        }
    } catch (e) {
        return res.status(404).json({message: 'Error 404 Not Found URL', error: e})
    }
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
            try {
                // To read file.
                const data = JSON.parse(fs.readFileSync('db.json', 'utf8'))
                if (data instanceof Array) {
                    // If it's an Array, do something
                    data.push(user)
                    fs.writeFile('db.json', JSON.stringify(data), (err) => {
                        if (err) throw err;
                        return res.status(200).json(user)
                    })
                } else {
                    // If just has one user, do something
                    let array = []
                    array.push(data, JSON.parse(jsonUser))
                    const arrayDB = JSON.stringify(array)

                    fs.writeFile('db.json', arrayDB, (err) => {
                        if (err) throw err;
                        return res.status(200).json(user)
                    })
                }
            } catch (e) {
                console.error(e)
                return res.status(404).json({ message: 'Error 404 Not Found' })
            }
        }
    } catch (e) {
        return res.status(404).json({message: 'Error 404 Not Found URL', error: e})
    }
})

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Social Network Running at Port 8080')
})
