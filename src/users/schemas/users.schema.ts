import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UsersSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: Number, default: 4 },
  createdAt: { type: Number },
  lastUpdateAt: { type: Number },
});

UsersSchema.pre('save', async function (next) {
  this['createdAt'] = Date.now();
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this['password'] = await bcrypt.hash(this['password'], 10);
  } catch (error) {
    return next(error);
  }
});
