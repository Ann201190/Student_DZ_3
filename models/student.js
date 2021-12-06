const { uuid } = require('uuidv4');
const fs = require('fs')
const path = require('path')

class Student {
  constructor(lastname, firstname, patronymic, age, group) {
    this.lastname = lastname
    this.firstname = firstname
    this.patronymic = patronymic
    this.age = age
    this.group = group
    this.id = uuid()
    console.log(this.id)
  }

  toJSON() {
    return {
      lastname: this.lastname,
      firstname: this.firstname,
      patronymic: this.patronymic,
      age: this.age,
      group: this.group,
      id: this.id
    }
  }

  async save() {
    const students = await Student.getAll()
    students.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'students.json'),
        JSON.stringify(students),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }


  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'students.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            console.log(content)
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }

  static async getById(id) {
    const students = await Student.getAll()
    // console.log(students)
    return students.find(c => c.id === id)
  }

  static async update(student) {
    const students = await Student.getAll()
    //  console.log("попали в обновить")
    const idx = students.findIndex(c => c.id === student.id)
    students[idx] = student

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'students.json'),
        JSON.stringify(students),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static async delete(id) {
    const students = await Student.getAll()
    //console.log("попали в удалить")

    const idx = students.findIndex(c => c.id === id)
    students.splice(idx, 1);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'students.json'),
        JSON.stringify(students),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }
}


module.exports = Student