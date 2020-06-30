require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController.js'),
      ctrl = require('./controllers/controller'),
      port = SERVER_PORT,
      app = express();

      app.use(express.json());

      app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24}
    }))

      massive({
        connectionString: CONNECTION_STRING,
        ssl: {rejectUnauthorized: false}
    }).then(db => {
        app.set('db', db);
        console.log('db connected')
    })

    //endpoints
    app.get('/api/posts/:userid', ctrl.getUserPosts)

    //auth endpoints 
    app.post('/api/register', authCtrl.register)
    app.post('/api/login', authCtrl.login)

    app.listen(port, () => console.log(`server is running on ${SERVER_PORT}`))