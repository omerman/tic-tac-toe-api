export enum Square {
  Empty,
  X,
  O,
}

export enum GameStatus {
  AwaitingPlayer2,
  InProgress,
  Player1Wins,
  Player2Wins,
  Draw,
}

export interface User {
  id: number;
}

export type Board = Square[][];

export interface Game {
  id: number;
  board: Board;
  player1: User;
  player2?: User;
}

export interface CreateGameRequestBody {
  playerId: number;
}

export interface CreateGameResponseBody {
  gameId: number;
}
