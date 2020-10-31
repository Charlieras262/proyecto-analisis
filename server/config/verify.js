const User = require('../models/User');
const bcrypt = require('bcryptjs');
const genVal = require('../controllers/validations/general.validation');

module.exports.createAdminUser = () => {
    User.findUserOne('U2FsdGVkX1+R12QaOxPd63ia7twSAP4mxxi2U+hIhKU=', (err, user) => {
        const userData = 'U2FsdGVkX19D/QE5UDhXJtc3wzKyKba7zpHi7H1UuioGsNCY3427J/6WCofjeZzjyOejnUnhuK6vt+eycswTsq378I1jjtkvF87WzJoL4Km3GZIYNRgAuE/HOTYCDn0weHsY6F0zF1bhbHBTQ30hwZRFQD/UQt5DWWkyO+pIg05VUxX/JctUd4cAAa68ctBwpimocmJ4+5SEpG3qt8IX0C8XKscV0Tmg44dL0Yo2DpM='
        if (err) throw err;
        if (!user) {
            console.log('Admin User has not created');
            console.log('Creating...');
            var user = JSON.parse(genVal.decrypt(userData))
            user.password = bcrypt.hashSync(JSON.parse(genVal.decrypt(userData)).password, 10)
            new User(user).save()
            console.log('Super User Created');
        } else {
            console.log('Admin User is already Created');
        }
    });
}