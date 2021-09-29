import { Api } from "./Api";
import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
} from "inversify-express-utils";
import {
  ApiPath,
  ApiOperationPost,
  ApiOperationGet,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";
import {
  CreateGameRequestModel,
  CreateGameResponseModel,
  JoinGameRequestModel,
  MarkSquareRequestModel,
} from "./models";

@ApiPath({
  path: "/",
  name: "Base",
})
@controller("/")
export class Controller implements interfaces.Controller {
  public static TARGET_NAME: string = "BaseController";

  @ApiOperationPost({
    path: "",
    summary: "Create Game",
    parameters: {
      body: { model: CreateGameRequestModel.modelName },
    },
    responses: {
      200: { description: "Success", model: CreateGameResponseModel.modelName },
    },
  })
  @httpPost("/")
  public create(
    request: Request<{}, {}, CreateGameRequestModel>,
    response: Response<CreateGameResponseModel>
  ): void {
    const { playerId } = request.body;

    const game = Api.createGame(playerId);

    response.json({ gameId: game.id });
  }

  @ApiOperationPost({
    path: "{gameId}/join",
    summary: "Join Game",
    parameters: {
      path: {
        gameId: {
          type: SwaggerDefinitionConstant.NUMBER,
          required: true,
        },
      },
      body: { model: JoinGameRequestModel.modelName },
    },
    responses: {
      200: { description: "Success" },
    },
  })
  @httpPost(":gameId/join")
  public join(
    request: Request<Record<keyof any, string>, {}, JoinGameRequestModel>,
    response: Response
  ): void {
    const { gameId: gameIdStr } = request.params;
    const gameId = Number(gameIdStr);

    const { playerId } = request.body;

    Api.joinGame(gameId, playerId);

    response.end();
  }

  @ApiOperationPost({
    path: "{gameId}/mark-square",
    summary: "Mark square in Game",
    parameters: {
      path: {
        gameId: {
          type: SwaggerDefinitionConstant.NUMBER,
          required: true,
        },
      },
      body: { model: MarkSquareRequestModel.modelName },
    },
    responses: {
      200: { description: "Success" },
    },
  })
  @httpPost(":gameId/mark-square")
  public markSquare(
    request: Request<Record<keyof any, string>, {}, MarkSquareRequestModel>,
    response: Response
  ): void {
    const { gameId: gameIdStr } = request.params;
    const gameId = Number(gameIdStr);

    const { playerId, coords } = request.body;

    Api.markSquare(gameId, playerId, coords);

    response.end();
  }

  @ApiOperationGet({
    path: "{gameId}/status",
    summary: "Get Game Status",
    parameters: {
      path: {
        gameId: {
          type: SwaggerDefinitionConstant.NUMBER,
          required: true,
        },
      },
    },
    responses: {
      200: { description: "Success" },
    },
  })
  @httpGet(":gameId/status")
  public status(request: Request, response: Response): void {
    const { gameId: gameIdStr } = request.params;
    const gameId = Number(gameIdStr);

    const status = Api.getGameStatus(gameId);

    response.json({ status });
  }
}
