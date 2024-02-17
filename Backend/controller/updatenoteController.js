import User from "../model/userModel.js";

export const updatenote = async (req, res) => {
    try {
        const { notetext, email, notename, noteid } = req.body;
        console.log(noteid);

        // Find the user by email and update the specific note
        const user = await User.findOneAndUpdate(
            { email, 'notes._id': noteid },
            { $set: { 'notes.$.notetext': notetext, 'notes.$.notename': notename } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the updated note within the user's notes array
        const updatedNote = user.notes.find(note => note._id.toString() === noteid);

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note updated successfully', updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
