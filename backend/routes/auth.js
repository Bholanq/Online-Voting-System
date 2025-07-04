import express from 'express'
import {registerUser,loginUser} from "../controllers/authControllers.js";


//create a router instance
const router = express.Router();

//define the routes eg router.method()

router.post('/register',registerUser);
router.post('/login',loginUser);

export default router;
