const { Router } = require('express')
const Group = require('../models/group')
const router = Router()

router.get('/', (req, res) => {
  res.render('addgroups', {
    title: 'Добавить группу'
  })
})

router.post('/', async (req, res) => {

  const group = new Group(req.body.name)
  await group.save()
  res.redirect('/groups')
})

module.exports = router

