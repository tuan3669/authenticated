export const createNewUser = (req, res) => {
  return res.render("home", { title: "Tạo tài khoản", page: "newUser" });
};
export const listUser = (req, res) => {
  const { page = 1 } = req.params;
  const perPage = 5;
  const from = (page - 1) * perPage + 1;
  const to = page * perPage;
  return res.render("home", {
    title: "Danh sách tài khoản",
    page: "listUser",
    params: `${from} - ${to}`,
  });
};
export const detailUser = (req, res) => {
  res.render("home", {
    title: "Chi tiết người dùng",
    params: req.params.username || "",
    page: "detailUser",
  });
};
export const login = (req, res) => {
  res.render("home", { title: "Đăng nhập", page: "login" });
};
export const register = (req, res) => {
  res.render("home", { title: "Đăng ký", page: "register" });
};
