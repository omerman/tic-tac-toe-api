import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant,
} from "swagger-express-ts";

@ApiModel({
  name: "CreateGameRequest",
})
export class CreateGameRequestModel {
  static modelName = "CreateGameRequest";

  @ApiModelProperty({
    description: "Id of player",
    required: true,
    type: SwaggerDefinitionConstant.NUMBER,
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
    type: SwaggerDefinitionConstant.NUMBER,
  })
  gameId: number;
}

@ApiModel({
  name: "JoinGameRequest",
})
export class JoinGameRequestModel {
  static modelName = "JoinGameRequest";

  @ApiModelProperty({
    description: "Id of player",
    required: true,
    type: SwaggerDefinitionConstant.NUMBER,
  })
  playerId: number;
}

@ApiModel({
  name: "MarkSquareRequest",
})
export class MarkSquareRequestModel {
  static modelName = "MarkSquareRequest";

  @ApiModelProperty({
    description: "Id of player",
    required: true,
    type: SwaggerDefinitionConstant.NUMBER,
  })
  playerId: number;

  @ApiModelProperty({
    description: "Coordinates",
    required: true,
    itemType: SwaggerDefinitionConstant.NUMBER,
    type: SwaggerDefinitionConstant.ARRAY,
    example: [0, 0],
  })
  coords: [number, number];
}
