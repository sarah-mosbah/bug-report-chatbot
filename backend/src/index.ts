import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { start as startDialogFlow } from "./routes/dialog-flow.routes";

export const app = express();
app.use(bodyParser.json());

startDialogFlow(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("app is listening"));
