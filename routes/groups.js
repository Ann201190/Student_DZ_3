const { Router } = require('express')
const Group = require('../models/group')
const router = Router()

router.get('/', async (req, res) => {
  const groups = await Group.getAll()
  res.render('groups', {
    title: 'Группы',
    groups
  })
})





router.get('/id=:id/edit', async (req, res) => {
  const group = await Group.getById(req.params.id);
  res.render('group-edit', {
    title: 'Редактирование группы',
    group
  })
})

router.post('/edit', async (req, res) => {
  await Group.update(req.body);
  res.redirect('/groups')
})

router.get('/id=:id/del', async (req, res) => {
  await Group.delete(req.params.id);
  res.redirect('/groups')
})

module.exports = router