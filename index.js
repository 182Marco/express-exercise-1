const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

mongoose
  .connect(config.get('db'))
  .then(() => console.log('connected to mongoDB...'))
  .catch(er => console.er('error:', er))

const courseSchema = new mongoose.Schema({
  _id: {type: String},
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
})

const Course = mongoose.model('Courses', courseSchema)

const getCourse = async () =>
  await Course.find({
    isPublished: true,
  })
    .or([{ price: { $gte: 15 } }, { name: { $regex: /.*by.*/i } }])
    .sort('-price')
    .select('name author price')

getCourse().then(r => console.log(r))


const upDateCourse =  async (id) => {
  const c = await Course.findById(id);
  if(!c) return
  c.author = 'other author'
  const r = await c.save()
  return r
}

upDateCourse('5a6900fff467be65019a9001').then(r => console.log(r))