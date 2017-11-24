
import mongoose, { Schema } from 'mongoose';

const Data = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
}, {
  _id: false,
});

const User = new Schema({
  twitter: {
    id: String,
    displayName: String,
    username: String,
    photo: String,
    email: String,
    password: String,
  },
  nbrClicks: {
    clicks: Number,
  },
  info: {
    data: [Data],
  },
});

export default mongoose.model('User', User);
