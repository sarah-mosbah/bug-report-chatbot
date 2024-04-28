import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import { start as startDialogFlow } from "./routes/dialog-flow.routes";
let corsOptions = {
  origin: ["http://localhost:4200"],
};

export const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

startDialogFlow(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("app is listening"));
