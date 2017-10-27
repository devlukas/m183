const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('path');
const exphbs = require('express-handlebars');
const oauthserver = require('oauth2-server');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
  })); 
app.use(bodyParser.json());

app.oauth = oauthserver({
    model: {}, // See below for specification 
    grants: ['password'],
    debug: true
  });


app.get('/', app.oauth.authorise(), function (req, res) {
  res.render('index');
});


app.post('/auth', function(req, res) {
    console.log(req.body);
});

app.all('/oauth/token', app.oauth.grant());

app.use(app.oauth.errorHandler());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})