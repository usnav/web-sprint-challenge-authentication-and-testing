const {
    find,
 } = require('../auth/auth-model')

 const checkRegistrationValid = (req, res, next) => {
    const { username, password } = req.body
        if (!username || !password) {
            next({status: 401, 
                message: "username and password required"
            })
        } else {
            next()
        }
 }


 const checkUsernameExists = async (req, res, next) => {
    const {username} = req.body
    const name = await find(username)
        if (name.length !== 0) {
            res.status(401).json({
                message: "username taken"
            })
        }
        next()
 }

 module.exports = {
    checkUsernameExists, 
    checkRegistrationValid
 }