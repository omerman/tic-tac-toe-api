import { Api } from "./api";
import { Request, Response } from "express";
import { controller, httpPost, interfaces } from "inversify-express-utils";
import { ApiPath, ApiOperationPost } from "swagger-express-ts";
import { CreateGameRequestModel, CreateGameResponseModel } from "./models";
import { CreateGameRequestBody, CreateGameResponseBody } from "./types";

@ApiPath({
  path: "/",
  name: "Base",
})
@controller("/")
export class Controller implements interfaces.Controller {
  public static TARGET_NAME: string = "BaseController";

  @ApiOperationPost({
    summary: "Create Game",
    parameters: {
      body: { model: CreateGameRequestModel.modelName },
    },
    responses: {
      200: { description: "Success", model: CreateGameResponseModel.modelName },
      400: { description: "Parameters fail" },
    },
  })
  @httpPost("/")
  public postVersion(
    request: Request<{}, {}, CreateGameRequestBody>,
    response: Response<CreateGameResponseBody>
  ): void {
    const { playerId } = request.body;

    const game = Api.createGame(playerId);

    response.json({ gameId: game.id });
  }
}
