// userModel.js
import mongoose from 'mongoose';
import Notehistory from '../model/notesModel.js';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    verify: String,
    notes:{ type: [Notehistory.schema], default: [] },
});

const User = mongoose.model('Users', userSchema);

export default User;