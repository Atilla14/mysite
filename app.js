let express = require('express')
let app = express()

var stylus = require('express-stylus')
var nib = require('nib')
const path = require('path')
const publicDir = path.join(__dirname, '/public')


const env = process.env.NODE_ENV || "development"
const port = process.env.PORT || 80

app.use(stylus({
  src: publicDir,
  use: [nib()],
  import: ['nib']
}));

app.use(express.static(publicDir))

app.set('view engine', 'pug')


app.get('/', (req, res) => {
  res.render('index', {})
})


app.listen(port, function() {
		console.log("Listening on port " + port + " in " + env + " mode")
	})
