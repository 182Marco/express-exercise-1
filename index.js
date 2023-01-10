const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

mongoose
  .connect(config.get('db'))
  .then(() => console.log('connected to mongoDB...'))
  .catch(er => console.er('error:', er))

const courseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
})

const Movie = mongoose.model('Courses', courseSchema) 

const getMovie = async () => {
  const movies = await Movie.find()
    .sort({ name: 1 }) 
    .select('name') 
     console.log(`those are the movies : `,
     movies) 
}

getMovie()