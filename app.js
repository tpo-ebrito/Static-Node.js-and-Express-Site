// Imports express

const express = require('express')
const app = express()
const port = 3000

// sets data.json to projects

const projects = require('./data.json')

/**
 *  Sets the static route
 *  Sets the view engine to pug
 */

app.use('/static', express.static('public'))
app.set('view engine', 'pug')

// Root page route. Lists all of the projects
app.get('/', (req, res) => {
  res.render('index', projects)
})

// About route. Sets 
app.get('/about', (req, res) => {
  res.render('about')
})

// project route. Displays each project in the data.json file.
app.get('/project/:id', (req, res) => {
  const project = projects.projects[global.parseInt(req.params.id - 1)]
  res.render('project', { project })
})

// Errors handlers

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
