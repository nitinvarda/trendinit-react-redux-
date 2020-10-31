const mongoose = require('mongoose')
const User = require('../../models/userSchema');
const jwt = require('jsonwebtoken');


const userOneId = new mongoose.Types.ObjectId()
const token = jwt.sign({ _id: userOneId }, process.env.JWTTOKEN)

const userOne = {
    _id: userOneId,
    name: 'mike',
    password: '12345678',


}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOneId,
    token,
    userOne,
    setupDatabase

}