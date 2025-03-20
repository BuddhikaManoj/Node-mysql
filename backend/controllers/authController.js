import { connectToDatabase } from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getUserController = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE id=?", [
      req.userId,
    ]);
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({ success: true, user: rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
      return res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    const isMatchPassword = await bcrypt.compare(password, rows[0].password);
    const isMatchEmail = email === rows[0].email;
    if (!isMatchPassword || !isMatchEmail) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ success: true, token: token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { registerController, loginController, getUserController, verifyToken };
