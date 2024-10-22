export interface IPlayer {
    readonly name: string;
    games: number;
    goals: number;
    assists: number;
    points: number;
    pointsPerGame: number;
    teamGoalsPerGame: number;
    concededTeamGoalsPerGame: number;
}

export interface ISeason {
  name: string;
  begins: string;
  ends: string;
  numberOfGames: number;
}

export interface IPlayerStatsResult {
  playerList: IPlayer[]
  seasons: ISeason[]
}