




const customers = require('../Model/products');
const { createToken, checkToken  } = require('../Auth');
const middleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(200).json({
            status: 'error',
            message: "token is required.",
        });
    }

    const isVerified = checkToken(token);
    if (!isVerified) {
        return res.status(200).json({
            status: 'error',
            message: "You are not authorized",
        });
    }

    //
    customers.findOne({ token: token }).then((user) => {
      if(user){
        next()
      }else{
        return res.status(200).json({
            status: 'error',
            message: "You are not authorized",
        });
      }
    }).catch((err) => {
        return res.status(200).json({
            status: 'error',
            message: "You are not authorized",
        });
    })



        
    //   }  
    // }).catch((err) => { 
    //     return res.status(200).json({
    //         status: 'error',
    //         message: "You are not authorized",
    //     }); 
    // })




    
}

module.exports = middleware;