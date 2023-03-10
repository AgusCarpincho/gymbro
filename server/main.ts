import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const bodyParser = require("body-parser");

const app: Express = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME?.toString() || "localhost";

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "GET Home route working fine!!!",
  });
});

app.listen(Number(port), hostname, () => {
  console.log(`Server running in http://${hostname}:${port}`);
});
