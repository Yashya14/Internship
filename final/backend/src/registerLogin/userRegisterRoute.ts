import { Router } from "express";
import { registerUser, loginUser, getProfileDetails } from "./userRegisterController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:userId", getProfileDetails);
// router.delete("/delete/:userId", deleteUser);


export default router;