const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})