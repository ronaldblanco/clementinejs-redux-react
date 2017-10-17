
import mongoose, { Schema } from 'mongoose';

const User = new Schema({
  twitter: {
    id: String,
    displayName: String,
    username: String,
    photo: String,
    email: String,
    password: String
  },
  nbrClicks: {
    clicks: Number,
  },
	info: {
      data: Array
  }
});

export default mongoose.model('User', User);
