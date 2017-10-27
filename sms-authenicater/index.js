const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('path');
const exphbs = require('express-handlebars');
const crypto = require('crypto');

const config = require('./config.json');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
  })); 
app.use(bodyParser.json());

var Nexmo = require('nexmo');

var nexmo = new Nexmo(config.nexmo);

app.get('/', function (req, res) {
  res.render('index');
});

var token = '';

app.post('/login', function (req, res) {
    console.log(req.body)
    if(req.body.username == 'lukas' && req.body.password == 'test') {
        token = crypto.randomBytes(4).toString('hex');
        console.log(token)
        nexmo.message.sendSms('GIBZ', config.phonenumber, 'Your token: ' + token , {}, function() {
            console.log('message sent ' + token)
        });
        res.render('index', { tokenSent: true });
    }
    if (req.body.token) {
        if (token == req.body.token) {
            res.render('finished');
        } else {
            res.render('wrong');
        }
    }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})