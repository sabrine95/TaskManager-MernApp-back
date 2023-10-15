const jwt = require('jsonwebtoken')

const authMiddleware = async ( req, res, next) => {
    try {
        const token = req.headers.token
        if (!token) res.status(401).json({msg:" you are not authorized !!"})
        else {
            const verifyToken = await jwt.verify(token, process.env.SECRET_JWT)
            if (!verifyToken) res.status(401).json({msg:"you are not authorized"})
        else {
            req.body.userId = verifyToken.id
            next()
        }
        }
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}

module.exports = authMiddleware