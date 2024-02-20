import User from "../../model/userModel.js";

// This is the function to delte the note os user 

export const deletenote = async (req, res) => {

    try {
        const { noteid, userid } = req.body;
        const user = await User.findOne({ _id: userid });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const noteIndex = user.notes.findIndex(note => note._id.toString() === noteid);
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }
        user.notes.splice(noteIndex, 1);
        await user.save();
        res.status(200).json({ message: 'Note deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
