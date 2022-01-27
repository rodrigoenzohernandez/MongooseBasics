const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema


// const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
    unique: true
  }
});

userSchema.plugin(passportLocalMongoose)

/**
 * Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

Additionally Passport-Local Mongoose adds some methods to your Schema. See the API Documentation section for more details.
 */


// userSchema.statics.findAndValidate = async function (username, password) {
//   const foundUser = await this.findOne({ username });

//   let logged = false;
//   if (foundUser) {
//     logged = await bcrypt.compare(password, foundUser.password);
//   }
//   return logged ? foundUser : false;
// };

// userSchema.pre('save', async function(next){
//     //this refers to the particular instance
//     if(!this.isModified(this.password)) return next()
//     this.password = await bcrypt.hash(this.password, 12)
//     next()
// })

module.exports = mongoose.model("User", userSchema);
