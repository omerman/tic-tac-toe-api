import { Board, Game, GameStatus, Square, User } from "./types";

export class Api {
  private static games: Game[] = [];
  private static users: User[] = [
    { id: 0 }, // Mock user 1
    { id: 1 }, // Mock user 2
  ];

  static createGame(player1Id: number): Game {
    const player1 = Api.getUser(player1Id);

    const game: Game = {
      id: Api.games.length,
      board: Api.initiateBoard(),
      player1,
    };

    Api.games.push(game);

    return game;
  }

  static joinGame(gameId: number, player2Id: number) {
    const player2 = Api.getUser(player2Id);
    const game = Api.getGame(gameId);

    game.player2 = player2;
  }

  static getGameStatus(gameId: number): GameStatus {
    const game = Api.getGame(gameId);

    if (!game.player2) return GameStatus.AwaitingPlayer2;

    const { board } = game;

    // Check rows win.
    for (let row = 0; row < 3; row++) {
      const rowsSquares = board[row];

      if (rowsSquares.every((cell) => cell === Square.X)) {
        return GameStatus.Player1Wins;
      }

      if (rowsSquares.every((cell) => cell === Square.O)) {
        return GameStatus.Player2Wins;
      }
    }

    // Check cols win.
    for (let col = 0; col < 3; col++) {
      const colsSquares = [board[0][col], board[1][col], board[2][col]];

      if (colsSquares.every((cell) => cell === Square.X)) {
        return GameStatus.Player1Wins;
      }

      if (colsSquares.every((cell) => cell === Square.O)) {
        return GameStatus.Player2Wins;
      }
    }

    // Check ltr diagonal win.
    const ltrDiagonalSquares = [board[0][0], board[1][1], board[2][2]];

    if (ltrDiagonalSquares.every((cell) => cell === Square.X)) {
      return GameStatus.Player1Wins;
    }

    if (ltrDiagonalSquares.every((cell) => cell === Square.O)) {
      return GameStatus.Player2Wins;
    }

    // Check rtl diagonal win.
    const rtlDiagonalSquares = [board[0][2], board[1][1], board[2][0]];

    if (rtlDiagonalSquares.every((cell) => cell === Square.X)) {
      return GameStatus.Player1Wins;
    }

    if (rtlDiagonalSquares.every((cell) => cell === Square.O)) {
      return GameStatus.Player2Wins;
    }

    // Check Draw
    if (board.every((row) => row.every((col) => col !== Square.Empty))) {
      return GameStatus.Draw;
    }

    // If both player exist, no player wins, and no draw, game is still in progress :)
    return GameStatus.InProgress;
  }

  static markSquare(
    gameId: number,
    playerId: number,
    [row, col]: [number, number]
  ) {
    const status = Api.getGameStatus(gameId);

    if (status !== GameStatus.InProgress) {
      throw new Error(
        `Mark square cannot be done, game with id ${gameId} is not in progress.`
      );
    }

    const game = Api.getGame(gameId);
    if (game.board[row][col] !== Square.Empty) {
      throw new Error(
        `Mark square cannot be done, game with id ${gameId}, row ${row}, col ${col} is occupied already.`
      );
    }

    const player = Api.getUser(playerId);
    game.board[row][col] = game.player1 === player ? Square.X : Square.O;
  }

  private static getUser(userId: number) {
    const user = Api.users.find((x) => x.id === userId);

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    return user;
  }

  private static getGame(gameId: number) {
    const game = Api.games.find((x) => x.id === gameId);

    if (!game) {
      throw new Error(`Game with id ${gameId} not found`);
    }

    return game;
  }

  private static initiateBoard(): Board {
    return [
      Array.from<Square>({ length: 3 }).fill(Square.Empty),
      Array.from<Square>({ length: 3 }).fill(Square.Empty),
      Array.from<Square>({ length: 3 }).fill(Square.Empty),
    ];
  }
}
