const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

app.set('port', (process.env.PORT || 5001))
app.use(cors())
app.use('/', routes)

app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'))
})
