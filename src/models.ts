import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "CreateGameRequest",
})
export class CreateGameRequestModel {
  static modelName = "CreateGameRequest";

  @ApiModelProperty({
    description: "Id of player",
    required: true,
    example: 1,
  })
  playerId: number;
}

@ApiModel({
  name: "CreateGameResponse",
})
export class CreateGameResponseModel {
  static modelName = "CreateGameResponse";

  @ApiModelProperty({
    description: "Id of created game",
    required: true,
  })
  gameId: number;
}
