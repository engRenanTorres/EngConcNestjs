import * as mongoose from 'mongoose';

export const QuestionsSchema = new mongoose.Schema({
  text: { type: String, require: true },
  answer: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  choices: {
    type: [String],
    required: true,
    unique: false,
  },
  tips: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
  },
  createdAt: { type: Number },
  lastUpdateAt: { type: Number },
});

QuestionsSchema.pre('save', async function () {
  this['createdAt'] = Date.now();
  this['lastUpdateAt'] = Date.now();
});
