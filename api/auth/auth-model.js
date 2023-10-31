const db = require('../../data/dbConfig')

function find(username) {
    return db('users')
    .where({username})
    .select('id', 'username', 'password')
}

async function add(user) {
    await db('users')
    .insert(user)
    return find(user.username).first()
}

module.exports = {
    find, 
    add
}