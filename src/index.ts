import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import {
  interfaces,
  InversifyExpressServer,
  TYPE,
} from "inversify-express-utils";
import * as swagger from "swagger-express-ts";
import { Controller } from "./Controller";

const port = 3000;

// set up container
const container = new Container();

// note that you *must* bind your controllers to Controller
container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(Controller)
  .inSingletonScope()
  .whenTargetNamed(Controller.TARGET_NAME);

// create server
const server = new InversifyExpressServer(container);

server.setConfig((app: express.Application) => {
  app.use("/swagger", express.static(`${__dirname}/swagger`));
  app.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );
  app.use(express.json());
  app.use(
    swagger.express({
      definition: {
        info: {
          title: "My api",
          version: "1.0",
        },
        externalDocs: {
          url: "My url",
        },
        // Models can be defined here
      },
    })
  );
});

const app = server.build();

app.listen(port);
console.info(`Server is listening on port : ${port}`);
