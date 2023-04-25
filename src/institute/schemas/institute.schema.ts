import * as mongoose from 'mongoose';

export const InstitutesSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  about: { type: String, required: false },
  website: { type: String, required: false },
  socialMedia: { type: String, required: false },
  createdAt: { type: Number },
  lastUpdateAt: { type: Number },
});

InstitutesSchema.pre('save', async function () {
  this['createdAt'] = Date.now();
  this['lastUpdateAt'] = Date.now();
});
