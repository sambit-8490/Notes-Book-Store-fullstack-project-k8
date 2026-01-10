import { Schema, model } from "mongoose";
// import bcrypt from "bcrypt";
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
}, { timestamps: true })

// userSchema.pre("save", function (next) {
//   const user = this

//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError)
//       } else {
//         bcrypt.hash(user.password, salt, function(hashError, hash) {
//           if (hashError) {
//             return next(hashError)
//           }

//           user.password = hash
//           next()
//         })
//       }
//     })
//   } else {
//     return next()
//   }
// })

const User = model("User", userSchema)

export default User