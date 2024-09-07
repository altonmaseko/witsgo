const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // Create new user, if they dont exist or update their details

        // keep it simpler for now
        return cb(null, profile);

    }
));

// Called when storing user information in the session.
// Serializes the user object into the session, usually storing a user identifier 
// (but in this case, it stores the entire profile object).
passport.serializeUser(function (user, done) {
    done(null, user);
});

// Called when retrieving user information from the session for each request.
// Deserializes the user object from the session and attaches it to req.user for subsequent requests.
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Serialize: convert to a format that can be stored in the session
// Deserialize: convert back to a user object