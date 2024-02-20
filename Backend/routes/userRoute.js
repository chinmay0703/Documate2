import { addnotes } from '../controller/notescontroller/addnotesController.js';
import { addnotename } from '../controller/verifycontroller/checknotenameController.js';
import { forgotpassotp } from '../controller/verifycontroller/checkotpForgotpassController.js';
import { deletenote } from '../controller/notescontroller/deletenoteController.js';
import { getallnotes } from '../controller/notescontroller/getallnotesController.js';
import { hello } from '../controller/vercelconnectcontroller/helloController.js';


import { updatenote } from '../controller/notescontroller/updatenoteController.js';
import { updatepass } from '../controller/verifycontroller/updatepassController.js';
import { validateemail } from '../controller/verifycontroller/validateemailController.js';
import { validatetoken } from '../controller/verifycontroller/validatetokenController.js';
import { verifyemail } from '../controller/verifycontroller/verifyemailController.js';


import { signup } from '../controller/usercontroller/signupController.js'
import { login } from '../controller/usercontroller/signinController.js'
import { deleteall } from '../controller/usercontroller/deleteController.js'
import { deletee } from '../controller/usercontroller/deleteAlluserController.js'

import express from 'express';
const router = express.Router();

router.post("/postdata", signup);
router.get("/", hello);
router.post("/deletenote", deletenote);
router.post("/getallnotes", getallnotes);
router.post("/update", updatenote);
router.post("/sendnote", addnotes);
router.post("/deeleteall", deletee);
router.post("/addnotename", addnotename)
router.post("/auntheticatelogin", login);
router.post("/deleteallusers", deleteall);
router.post("/updatepass", updatepass);
router.post("/checkotp", forgotpassotp);
router.post("/validateemail", validateemail);
router.post("/verifyemail", verifyemail);
router.post("/validateToken", validatetoken);


export default router;
