import express from "express";
import { graphqlHTTP } from "express-graphql";
import { connectToDatabase } from "./utils/config.js";
import schema from "./schema/schema.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

connectToDatabase()
  .then(() => {
    app.listen(4000, () =>
      console.log("Database Connected\nServer Listening on 5000")
    );
  })
  .catch((err) => console.error(err));
