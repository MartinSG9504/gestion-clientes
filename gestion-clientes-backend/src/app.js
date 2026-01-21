import express from "express";
import cors from "cors";
import adminRoutes from "./routes/AdminRoutes.js"
import clientRoutes from "./routes/ClientRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import dotenv from "dotenv";


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/clientes", clientRoutes);

app.use("/api/Admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("API funcionando");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

