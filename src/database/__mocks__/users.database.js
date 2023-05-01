const fakeUsers = require('../../assets/fake-users.json')


const getUserByUsername = email => {
    const user = fakeUsers.find(item => item.username === email)

    if (user.status !== 'active') {
        return {
            Items: []
        }
    }

    return {
        Items: [{
            ...user
        }]
    }
}

module.exports = {
    getUserByUsername
}