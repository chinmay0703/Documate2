import transporter from "../../Utils/transporter.js";
import { hashPassword } from "../../functions/hashpass.js";
import User from "../../model/userModel.js";
import defaultMailOptions from "../../Utils/mailoptions.js";


// This is the signup function where first check if email is present earlier and if present send status code 404 and if not present create the user 
//  Password :encryption using bcrypt(Library)
//  Accound no:use random number function for creation of account no
//  Mail : send the email after successfully singup and use nodemailer (Library) for that
export const signup =( async (req, res) => {

    try {
        const { name,email,password} = req.body;
        console.log(email);
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(402).json({ error: 'Enter a valid email, please' });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("Email found");
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verify: 53146,
        });
        await newUser.save();
        const updatedMailOptions = {
            ...defaultMailOptions,
            to: newUser.email,
            subject: 'Welcome to Documate ',
            text: `Dear ${name},\n\nGreetings! We are thrilled to welcome you to our exclusive platform. Your account has been successfully created, and you are now part of a community committed to excellence.`,
            html: `
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    <b>Dear ${name},</b>
                </p>
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    Greetings! We are thrilled to welcome you to our exclusive platform. Your account has been successfully created, and you are now part of a community committed to excellence.
                </p>
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    Best regards,
                    <br>
                    Documate
                </p>
            `,
        };
        transporter.sendMail(updatedMailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent successfully");
                console.log('Email sent:' + info.response);
            }
        });
        res.status(200).json({ message: 'User data successfully saved to MongoDB!' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


