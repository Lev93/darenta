const {Schema, model} = require('mongoose')

const menu = new Schema({
  text: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
})

module.exports = model('Menu', menu)