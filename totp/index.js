const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('path');
const exphbs = require('express-handlebars');
const crypto = require('crypto');
const OTP = require('otp');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
app.use(bodyParser.json());

app.get('/', function (req, res) {
    var otp = OTP({});
    otp.totp(); // Generates an OTP using TOTP method
    
    var QRCode = require('qrcode')
    QRCode.toDataURL(otp.totpURL, function (err, qrCode) {
        res.render('index',  { secret:otp.secret, url: otp.totpURL, qrCode: qrCode, qrNeeded: true });
    });
});


app.post('/login', function (req, res) {
    if(req.body.username == 'lukas' && req.body.password) {
        
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