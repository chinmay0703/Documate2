import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
    notename: String,
    notetext: String,
});
const Notehistory = mongoose.model('Notehistory', noteSchema);
export default Notehistory;