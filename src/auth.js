const mongoose = require('mongoose');
const mongodb = require('mongodb');
const User = require('../src/models/User');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/google/callback`
},
  async (accessToken, refreshToken, profile, cb) => {


    try {

      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        console.log("User exists");
        return cb(null, user);
      }

      // If user does not exist, create a new user
      user = await User.create({
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        email: profile._json.email,
        googleId: profile.id,
        picture: profile._json.picture
      });

      console.log(`User Created: ${profile._json.name}`);
      return cb(null, user);

    } catch (error) {

      console.log("Error authenticating user: ", error);
      return cb(error, null);

    }



  }
));

// These methods are used for session-based authentication, where Passport stores user data in the session.
// We are not using them

// Called when storing user information in the session.
// Serializes the user object into the session, usually storing a user identifier 
// (but in this case, it stores the entire profile object).
passport.serializeUser(function (user, done) {
  console.log("Serializing user: ", user);
  done(null, user);
});

// Called when retrieving user information from the session for each request.
// Deserializes the user object from the session and attaches it to req.user for subsequent requests.
passport.deserializeUser(function (obj, done) {
  console.log("Deserializing user: ", obj);
  done(null, obj);
});

// Serialize: convert to a format that can be stored in the session
// Deserialize: convert back to a user object


// ============================================================================
/*
profile: 
{
    id: '115227575004267292324',
    displayName: 'Alton Maseko',
    name: { familyName: 'Maseko', givenName: 'Alton' },
    emails: [ { value: '2544308@students.wits.ac.za', verified: true } ],
    photos: [
      {
        value: 'https://lh3.googleusercontent.com/a/ACg8ocL0HF3gNcEwSE30YwNey3BGIxeZl1_WxK15RJhdMobdX8u9UQ=s96-c'
      }
    ],
    provider: 'google',
    _raw: '{\n' +
      '  "sub": "115227575004267292324",\n' +
      '  "name": "Alton Maseko",\n' +
      '  "given_name": "Alton",\n' +
      '  "family_name": "Maseko",\n' +
      '  "picture": "https://lh3.googleusercontent.com/a/ACg8ocL0HF3gNcEwSE30YwNey3BGIxeZl1_WxK15RJhdMobdX8u9UQ\\u003ds96-c",\n' +        
      '  "email": "2544308@students.wits.ac.za",\n' +
      '  "email_verified": true,\n' +
      '  "hd": "students.wits.ac.za"\n' +
      '}',
    _json: {
      sub: '115227575004267292324',
      name: 'Alton Maseko',
      given_name: 'Alton',
      family_name: 'Maseko',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocL0HF3gNcEwSE30YwNey3BGIxeZl1_WxK15RJhdMobdX8u9UQ=s96-c',
      email: '2544308@students.wits.ac.za',
      email_verified: true,
      hd: 'students.wits.ac.za'
    }
  }
  */