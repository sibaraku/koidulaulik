const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config.js");

// Создание пользователя
exports.createUser = async (req, res) => {
  try {
    const saltRounds = 10;
    console.log("Received user data:", req.body);
    const { username, email, password } = req.body; // деструктуризация

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err)
        return res.status(500).json({ message: "Error generating salt" });

      bcrypt.hash(password, salt, (err, hash) => {
        if (err)
          return res.status(500).json({ message: "Error hashing password" });

        User.create({ username, email, password: hash })
          .then((newUser) => {
            // Генерация токена с userId вместо clientId
            const token = jwt.sign({ userId: newUser.id }, authConfig.secret, {
              expiresIn: "2h",
            });

            res.status(201).json({
              message: "Created new user",
              newUser,
              accessToken: token, // добавлено для фронта
            });

            console.log(`[Server]: ${newUser.username} signed up`);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "Error creating user", error: err.message });
          });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Логин пользователя
exports.getUser = async (req, res) => {
  try {
    const { email, password } = req.body; // деструктуризация
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    User.findOne({ where: { email } }).then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords: ", err);
          return res
            .status(500)
            .json({ message: "Error during authentication" }); // добавлено для фронта
        } // Генерация токена с userId (исправлено с clientId)

        const token = jwt.sign({ userId: user.id }, authConfig.secret, {
          expiresIn: "2h",
        });

        if (result) {
          console.log(`[Server]: ${user.username} logged in`);
          return res.json({
            user,
            accessToken: token, // добавлено для фронта
          });
        } else {
          console.log("[Server]: Passwords do not match! Auth failed.");
          return res.status(401).json({ message: "Invalid credentials" }); // исправлено на JSON
        }
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получение информации о текущем пользователе
exports.getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" }); // добавлено

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token malformed" }); // добавлено
    // Декодируем токен с правильным секретом

    const decoded = jwt.verify(token, authConfig.secret);
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("Error in getMe:", err.message); // добавлено логирование
    res.status(500).json({ message: err.message });
  }
};
