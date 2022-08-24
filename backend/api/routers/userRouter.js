const express = require('express');
const userCon = require('../controllers/userCon')
const router = express.Router();

router.post('/login/users',userCon.login)
router.post('/users/create',userCon.createUser)
router.get('/users',userCon.getAllUsers)
router.put('/users/:username',userCon.updateUser)
router.delete('/users',userCon.deleteUser)

module.exports = router