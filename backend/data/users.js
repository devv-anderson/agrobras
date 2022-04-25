import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        cropSelection: '',
        isAdmin: true
    },
    {
        name: 'Guts',
        email: 'guts@email.com',
        cropSelection: '',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Griffth',
        email: 'griffth@example.com',
        cropSelection: 'fruits',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users