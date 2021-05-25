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
            // To read file.
            try {
                const data = fs.readFileSync('db.json', 'utf8')
                const dataJSON = JSON.parse(data)
                if (dataJSON instanceof Array) {
                    // Verificar si el contenido del .json es un Array, osea (tiene múltiples registros)
                    // Aún no PROGRAMAR
                } else {
                    // SI el archivo ya tiene un registro, el archivo estará entre llaves
                    // como un único objeto, el OBJETIVO es hacer una Array y poner ese JSON
                    // dentro del Array, y añadirle tambien el nuevo registro.
                    // Para que se grabe en el archivo .json un Array que contiene dos registros (JSON)
                    let array = []
                    array.push(dataJSON, jsonUser)
                    const arrayDB = JSON.stringify(array)

                    fs.writeFile('db.json', arrayDB, (err) => {
                        if (err) throw err;
                        return res.status(200).json({user})
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
