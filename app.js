const express = require('express')
const app = express()
const port = 3000

const projects = require('./data.json')

const aboutMe = {
  name: 'Edson Brito'
}

app.use('/static', express.static('public'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', projects)
})

app.get('/about', (req, res) => {
  res.render('about', aboutMe)
})

app.get('/contactus', (req, res) => {
  res.render('about', aboutMe)
})

app.get('/project/:id', (req, res) => {
  const selectedIndex = global.parseInt(req.params.id) - 1
  res.render('project', projects.projects[selectedIndex])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
