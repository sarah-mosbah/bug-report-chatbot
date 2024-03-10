import { keys } from "../config/keys";
import dialogFlow from "@google-cloud/dialogflow";
import express from "express";

const sessionClient = new dialogFlow.SessionsClient({
  keyFile: process.env.GOOGLE_FILE_PATH,
  projectId: keys.googleProjectID,
});
const sessionPath = sessionClient.projectAgentSessionPath(
  keys.googleProjectID,
  keys.dialogFlowSessionID
);
export const start = (app) => {
  app.get("/", (req, res) => {
    res.send("hello there");
  });

  app.post(
    "/api/df_text_query",
    async (req: express.Request, res: express.Response) => {
      const { text } = req.body;
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text,
            languageCode: keys.dialogFlowSessionLanguageCode,
          },
        },
      };
      try {
        const response = await sessionClient.detectIntent(request);

        const result = response[0].queryResult;
        if (result.intent) {
          res.send(result);
        } else {
          res.send("nonnnnn");
        }
      } catch (error) {
        console.log("ERRRR:!!!!", error);
      }
    }
  );

  app.post("/api/df_event_query", (req, res) => {
    res.send("text query");
  });
};
