const express = require("express");
const connectDB = require("./config/db");
const app = express();

app.use(express.json({ extended: false }));

connectDB();
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server on port ${PORT}`));
