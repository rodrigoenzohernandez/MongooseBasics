const bcrypt = require('bcrypt')

// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12); //12 is the recommended min
//     const hash = await bcrypt.hash(pw, salt)
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12)
    console.log(hash);
}


const login = async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw)

    result ? console.log('LOGGED') : console.log('401');
}
hashPassword('monkey')


//login('monkey', '$2b$12$R9dngy/j0wvLnTFXKrn9qOA38vY33e3RDoc/QYi4CvXr1OMDY23Li')
//login('monkey', '$2b$12$iEWQY7zI3N//EuJKHY1ey.P8kffNokY61qyAWsOEHdqN96SOaye0W')

