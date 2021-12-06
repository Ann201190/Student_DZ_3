const { Router } = require('express')
const Student = require('../models/student')
const Group = require('../models/group')

const router = Router()

router.get('/', async (req, res) => {
  const groups = await Group.getAll()
  console.log(groups)
  res.render('add', {
    title: 'Добавить студента',
    groups
  })
})

router.post('/', async (req, res) => {
  console.log(req.body)
  //add db
  const student = new Student(req.body.lastname, req.body.firstname, req.body.patronymic, req.body.age, req.body.group)

  await student.save()
  res.redirect('/students')
})

module.exports = router

