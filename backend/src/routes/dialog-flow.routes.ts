import { textQuery } from "../chatbot/cahtbot.service";

export const start = (app) => {
  app.get("/", (req, res) => {
    res.send("hello there");
  });

  app.post("/api/df_text_query", textQuery);

  app.post("/api/df_event_query", (req, res) => {
    res.send("text query");
  });
};
