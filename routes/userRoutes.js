const express = require('express')
const router = express.Router()
const {register, login, getUserData} = require('../controllers/userControllers')
const authMiddleware = require('../middlewares/authMiddleware')
const { check } = require('express-validator');

router.post('/register', [check("email", "Your email is not valid").isEmail().normalizeEmail(),
check("password", "Your password must be at least 6 characters and contain numbers, letters uppercase and lowercase, symbols").isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })
],register)
router.post('/login', login)
router.get('/', authMiddleware , getUserData)

module.exports = router