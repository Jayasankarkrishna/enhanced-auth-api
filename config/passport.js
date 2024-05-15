// config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: '597749745516-t7i7u8tduboil1hmol13esaca7cbup6i.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback' // This should be the callback URL registered with Google
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user exists in the database
      let user = await User.findByGoogleId(profile.id);
      
      // If the user doesn't exist, create a new user
      if (!user) {
        const newUser = {
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName
          // You can add other fields as needed
        };
        // Create the new user in the database
        user = await User.create(newUser);
      }

      // Return the user object
      done(null, user);
    } catch (error) {
      // If an error occurs, pass it to done
      done(error, false);
    }
  }
));


module.exports = passport;
