const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

mongoose
  .connect(config.get('db'))
  .then(() => console.log('connected to mongoDB...'))
  .catch((er) => console.er('error:', er))

const courseSchema = new mongoose.Schema({
  // _id: {type: String}, works also without this
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
    match: /.*by.*/i,
  },
  category: {
    type: String,
    required: true,
    enum: ['mobile', 'web', 'network'],
    lowercase: true,
    trim: true,
  },
  author: String,
  tags: {
    isAsync: true,
    type: Array,
    validate: {
      validator: v => v && v.length,
      message: 'You should have at least one tag',
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    min: 30,
    max: 60,
    type: String,
    get: v => Math.round(v),
    set: v => Math.round(v),
    required: function () {
      return this.isPublished
    },
  },
})

const Course = mongoose.model('Courses', courseSchema)

const createCourse = async () => {
  const c = new Course({
    name: 'NEW1 BY',
    isPublished: false,
    category: '   WEB    ',
    tags: ['something'],
    price: 55.678
  })
  try {
    const res = await c.save()
    console.log(res)
  } catch (er) {
    Object.keys(er.errors).forEach(key => console.log('erors: ', er.errors[key].message))
  }
}

createCourse()

const getCourse = async () =>
  await Course.find({
    name: /.*by.*/i,
  }).select('name author price category')

// getCourse().then(r => console.log(r))

const upDateCourse = async (id) => {
  const res = await Course.findByIdAndUpdate(
    { _id: id },
    { $set: { author: 'Mosh __bau' } },
    { new: true },
  )
  console.log('this are the results of the direct update: ', res)
}

const reomoveCourse = async (id) => {
  const res = await Course.findByIdAndRemove(
    { _id: id },
    { $set: { author: 'Mosh __bau' } },
    { new: true },
  )
  console.log('this are the results of the direct update: ', res)
}

// upDateCourse('5a6900fff467be65019a9001').then(r => console.log(r))
