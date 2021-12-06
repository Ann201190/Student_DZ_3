const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const homeRoutes = require('./routes/home')
const aboutRoutes = require('./routes/about')
const addRoutes = require('./routes/add')
const studentsRoutes = require('./routes/students')
const groupRoutes = require('./routes/groups')
const addgroupRoutes = require('./routes/addgroups')


const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/about', aboutRoutes)
app.use('/add', addRoutes)
app.use('/students', studentsRoutes)
app.use('/addgroups', addgroupRoutes)
app.use('/groups', groupRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})