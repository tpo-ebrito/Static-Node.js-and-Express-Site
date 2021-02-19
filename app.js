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
  const project = projects.projects[global.parseInt(req.params.id - 1)]
  res.render('project', {project})
})

app.use((req, res, next) => {
  const err = new Error()
  err.status = 404
  err.message = 'Sorry, the page that you are looking for doesn\'t exist.'
  console.error(`${err.message} Status Code: ${err.status}`)
  next(err)
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.render('page-not-found', { err })
  } else {
    err.status = 500
    err.message = 'There is something wrong with the code. Please try again later.'
    console.log(`${err.message} Status Code: ${err.status}`)
    res.render('error', { err })
  }
  return next()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
