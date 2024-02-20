import User from "../../model/userModel.js";

// This is the function to delte all the users 

export const deletee = (async (req, res) => {

    try {
        const result = await User.deleteMany({});
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All users deleted successfully.' });
        } else {
            res.status(404).json({ message: 'No users found to delete.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});