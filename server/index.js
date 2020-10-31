//Require the dependencies
const methodOverride = require('method-override');
const express = require('express')
const morgan = require('morgan');
const database = require('./database');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

const app = express();
require('./config/verify').createAdminUser();

//Setting
app.set("port", process.env.PORT || 8080)

//Database Connection
database()

//Middlerwares
app.use(methodOverride('_method'));
app.use(morgan('dev'))
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: 'http://localhost:4200' }));

require('./controllers/validations/passport')(passport);

//Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/assignments', require('./routes/asignations.routes'));
app.use('/api/cuentas', require('./routes/students.routes'));

// Set Static Folder

app.use(express.static(path.join(__dirname, 'resources')));

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './resources/index.html'));
});

// Starting Server
var server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});

require('./websocket/socket.io')(io);

module.exports = app;