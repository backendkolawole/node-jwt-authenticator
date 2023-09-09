require('dotenv').config()
const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors/index')


const login = async (req, res)=> {
    const {username, password} = req.body
    console.log(req.body)
    
    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }
    const id = new Date().getDate()
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '2d' })
    res.status(200).json({msg: "user logged in", token})
}

const dashboard = async (req, res)=> {
    const luckyNumber = Math.ceil(Math.random() * 99)
    res.status(200).send(`Hello ${req.user.username}, your lucky number is ${luckyNumber}`)
}


module.exports = {login, dashboard}