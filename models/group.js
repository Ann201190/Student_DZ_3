const { uuid } = require('uuidv4');
const fs = require('fs')
const path = require('path')

class Group {
    constructor(name) {
        this.name = name
        this.id = uuid()
    }

    toJSON() {
        return {
            name: this.name,
            id: this.id
        }
    }

    async save() {
        const groups = await Group.getAll()
        groups.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'groups.json'),
                JSON.stringify(groups),
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
                path.join(__dirname, '..', 'data', 'groups.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id) {
        const groups = await Group.getAll()
        console.log(groups)
        return groups.find(c => c.id === id)
    }


    static async update(group) {
        const groups = await Group.getAll()
        const idx = groups.findIndex(c => c.id === group.id)
        groups[idx] = group

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'groups.json'),
                JSON.stringify(groups),
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
        const groups = await Group.getAll()
        const idx = groups.findIndex(c => c.id === id)
        groups.splice(idx, 1);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'groups.json'),
                JSON.stringify(groups),
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

module.exports = Group