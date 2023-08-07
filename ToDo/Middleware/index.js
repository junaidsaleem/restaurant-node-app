const toDoList = require('../Model/toDo');
const { createToken, checkToken  } = require('../Auth');

const middleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(200).json({
            status: 'error',
            message: "Token is required.",
        });
    }

    const isVerified = checkToken(token);
    if (!isVerified) {
        return res.status(200).json({
            status: 'error',
            message: "You are not authorized",
        });
    }

    // checks for token in the database | we put token in database in /login router
    toDoList.findOne({ token: token }).then((user) => {
      if(user){
        next()
      }else{
        return res.status(200).json({
            status: 'error',
            message: "User does not exist",
        });
      }
    }).catch((err) => {
        return res.status(200).json({
            status: 'error',
            message: "Error in authorization",
        });
    })

}

module.exports = middleware;