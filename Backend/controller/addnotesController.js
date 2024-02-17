import User from "../model/userModel.js";
import Notehistory from "../model/notesModel.js";

export const addnotes = async (req, res) => {
    try {
        const { notetext, email, notename } = req.body;
        console.log(notetext);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newNote = new Notehistory({ notename, notetext });
        user.notes.push(newNote);
        await user.save();
        res.status(200).json({ message: 'Note added successfully' });
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};