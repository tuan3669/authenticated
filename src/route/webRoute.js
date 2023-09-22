import express from "express";
import getHomePage from "../controllers/HomeController";
import getAboutPage from "../controllers/AboutController";
import { loginUser, logout, registerUser } from "../controllers/AuthController";
import {
  createNewUser,
  detailUser,
  listUser,
  login,
  register,
} from "../controllers/UserController";
import { isLogin, allowedRoles } from "../middleware/auth";
const router = express.Router();

const initWebRoute = (app) => {
  router.get("/", getHomePage);
  router.get("/about", getAboutPage);
  // authenticatd user
  router.post("/login", loginUser);
  router.post("/register", registerUser);

  // tao moi user can quyen admin
  router.get(
    "/create-new-user",
    isLogin,
    allowedRoles(["admin"]),
    createNewUser
  );

  router.get("/login", login);
  router.get("/logout", logout);
  router.get("/register", register);
  router.get("/list-user/:page?", listUser);
  router.get("/detail-user/:username?", isLogin, detailUser);
  router.get((req, res) => {
    res.send("Lỗi 404, không tìm thấy trang");
  });

  return app.use("/", router);
};

export default initWebRoute;
