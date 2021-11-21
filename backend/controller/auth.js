
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')


function login(req, res) {
  const username = req.body.username
  const password = req.body.password
  const user = db.get('staff').find({username: username}).value()
//   console.log(user)
    if(user){
        console.log(user)
        const isAMatch = bcrypt.compare(password, user.password)
        console.log(isAMatch);
        if(!isAMatch){
            res.status(401).json({
            status: 'false',
            message: "fel användarnamn eller lösenord"
            })
        }else{
            const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 600 })
            res.status(200).send({ success: true, token: token });
        }
    }else{
    res.status(401).json({
        status: 'false',
        message: "access denied"
    });
  }
}


function checkIfLoggedIn(request, response) {
  const token = request.header('Authorization').replace('Bearer ', '')
  console.log(token)

  let result = { loggedIn: false };

  if (token) {
    const validToken = jwt.verify(token, config.secret);

    console.log('JWT Verify:', validToken);

    if (validToken) {
      result.loggedIn = true;
    }
  }

  response.json(result);
}

exports.login = login;
exports.checkIfLoggedIn = checkIfLoggedIn;