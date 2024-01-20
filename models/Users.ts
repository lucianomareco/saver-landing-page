import { Schema, model, models } from 'mongoose'

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      trim: true
    },
    profession: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default models.Users || model('Users', UsersSchema)
