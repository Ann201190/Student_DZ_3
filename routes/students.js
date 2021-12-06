const { Router } = require('express')
const Student = require('../models/student')
const router = Router()

router.get('/', async (req, res) => {
  const students = await Student.getAll()
  res.render('students', {
    title: 'Студенты',
    students
  })
})


router.get('/id=:id/edit', async (req, res) => {
  const student = await Student.getById(req.params.id);
  res.render('student-edit', {
    title: 'Редактирование студента',
    student
  })
})

router.post('/edit', async (req, res) => {
  await Student.update(req.body);
  res.redirect('/students')
})

router.get('/id=:id/del', async (req, res) => {
  await Student.delete(req.params.id);
  res.redirect('/students')
})


module.exports = router