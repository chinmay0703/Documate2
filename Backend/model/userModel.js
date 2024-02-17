
import mongoose from 'mongoose';
import ParagraphModel from '../model/paragraphModel.js';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    verify: String,
    notes: {
        type: [{
            title: String,
            paragraphs: [{ type: ParagraphModel.schema, default: [] }],
        }],
        default: [],
    },
});

const User = mongoose.model('Users', userSchema);
export default User;
