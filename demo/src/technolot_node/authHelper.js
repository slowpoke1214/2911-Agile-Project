const passport = require('passport');
const JWT = require('jsonwebtoken');
const PassportJwt = require('passport-jwt');
const User = require('./Models/User');

const jwtSecret = 'ZPgPRKYoHBDXoGDR1cpoVngkmCSItkDiiHlr5X9dDYBJ3ffSgOOPM1axEHeldR7k'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '7 days'

passport.use(User.createStrategy())

passport.use(
    new PassportJwt.Strategy(
        {
            jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            algorithms: [jwtAlgorithm]
        },
        (payload, done) => {
            User.findById(payload.sub)
            .then(user => {
                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            })
            .catch(error => {
                done(error, false)
            })
        }
    )
)

function signJWTForUser(req, res) {
    const user = req.user
    const token = JWT.sign(
        {
            email: user.email
        },
        jwtSecret,
        {
            algorithm: jwtAlgorithm,
            expiresIn: jwtExpiresIn,
            subject: user._id.toString()
        }
    )
    res.json({ token })
}

module.exports = {
    initialize: passport.initialize(),
    signIn: passport.authenticate('local', { session: false }),
    requireJWT: passport.authenticate('jwt', { session: false }),
    signJWTForUser
}