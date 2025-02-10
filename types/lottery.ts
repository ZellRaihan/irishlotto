export interface Prize {
  match: string;
  prizeType: string;
  numberOfWinners: number;
  prize: number;
  _id: string;
}

export interface WinningNumbers {
  standard: number[];
  bonus: number;
}

export interface GameResult {
  gameType: string;
  jackpotAmount: number;
  winningNumbers: WinningNumbers;
  prizes: Prize[];
  prizeMessage: string;
}

export interface Raffle {
  id: string;
  numberOfWinners: number;
  prizeAmount: number;
  message: string;
}

export interface LotteryDraw {
  _id: string;
  drawDate: string;
  mainDraw: GameResult;
  plusOne: GameResult;
  plusTwo: GameResult;
  raffle: Raffle;
  __v: number;
}
