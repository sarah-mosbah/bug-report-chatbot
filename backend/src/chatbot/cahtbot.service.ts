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

export const textQuery = async (
  req: express.Request,
  res: express.Response
) => {
  const { text, parameters } = req.body;
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: keys.dialogFlowSessionLanguageCode,
      },
    },
    queryParameters: {
      payload: {
        data: parameters,
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
};
