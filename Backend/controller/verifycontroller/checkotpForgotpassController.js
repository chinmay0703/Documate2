import User from "../../model/userModel.js";

//  When the user's mail is verified 4 random number created by the random number function is send to the user's mail 
//  user have verify field which is also have teh same 4 numbers updated during creatin of otp

export const forgotpassotp=(async (req, res) => {

    const { otp, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user.verify === otp) {
            res.status(200).json({ message: "OTP matched" });
        } else {
            res.status(400).json({ error: "OTP does not matched" });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});