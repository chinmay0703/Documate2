import User from "../model/userModel.js";

export const addnotename = async (req, res) => {
    const { notename, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existingNote = user.notes.find(note => note.notename === notename);
        if (existingNote) {
            return res.status(404).json({ message: 'Note name already exists' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
