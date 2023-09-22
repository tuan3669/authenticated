import bcrypt from "bcrypt";
import connectDb from "../configs/connectDb";

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.redirect("/login");

  const db = await connectDb();
  //
  const [users, fields] = await db.execute(
    "SELECT * FROM `user` where email = ? ",
    [email]
  );
  // dang nhap ko tthanh cong nhap lai
  if (users.length < 0) return res.redirect("/login");

  // compare password
  const hashedPassword = users[0].password;

  const isMatched = bcrypt.compareSync(password, hashedPassword);

  // xoa key password ko can thiet tu ket qua CSDL
  delete users[0]["password"];
  console.log(users[0]);
  // mat khau khong khong
  if (!isMatched) return res.redirect("/login");

  // luu vao session dang object
  req.session.user = users[0];

  // neu lan ttruoc  co vao trang can authen thi chuyen vao ttrang do
  const path = req?.session?.path || "/";
  // xoa path cu di
  delete req?.session?.path;
  res.redirect(path);
};

const logout = async (req, res, next) => {
  delete req.session.user;
  delete req?.session?.path;

  res.redirect("/");
};

const registerUser = async (req, res, next) => {
  const { email, password, username } = req.body;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const db = await connectDb();
  //
  const [users, fields] = await db.execute(
    "INSERT INTO `user`(username, email, password) VALUES (? ,? ,? )",
    [username, email, hashedPassword]
  );
  if (users.affectedRows === 1) res.redirect("/");
};
export { loginUser, registerUser, logout };
