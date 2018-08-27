'use strict'

/**
 * OAuth2 Initialization
 */
const { google } = require('googleapis')
const oauth2Client = new google.auth.OAuth2(
  '15149169663-02mg21vihg1ukuqtbpqrcucd1uq6tqjd.apps.googleusercontent.com',
  'hujIRptZ1dZwi6_IhveekJ_B',
  'http://localhost:8881/oauth2callback'
)
const scopes = [
  'https://www.googleapis.com/auth/androidpublisher'
]

google.options({ auth: oauth2Client })

/**
 * Express Initialization
 */
const express = require('express')
const app = express()

/**
 * Routes
 */
app.get('/', (req, res, next) => {
  res.json({ response: 'GET /auth' })
})
app.get('/auth', (req, res, next) => {
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  })
  console.log(authorizeUrl)
  res.redirect(authorizeUrl)
})

app.get('/oauth2callback', async (req, res, next) => {
  const { code } = req.query
  const { tokens } = await oauth2Client.getToken(code)

  oauth2Client.setCredentials(tokens)
  res.json({ oauth2Client })
})

app.listen(8881, () => console.log('Up and running @ localhost:8881'))
