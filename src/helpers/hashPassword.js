import bcrypt from 'bcrypt'

export async function hashPassword(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password, hashPassword) {
    return bcrypt.compare(password, hashPassword)
}

