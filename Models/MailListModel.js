import mongoose from 'mongoose'

const mailListSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Mail = mongoose.model('Mail', mailListSchema)
export default Mail
