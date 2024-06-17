export default interface IPlayer {
    readonly name: string
    readonly games: number
    readonly goals: number
    readonly assists: number
    readonly points: number
    readonly pointsPerGame: number
    readonly teamGoalsPerGame: number
    readonly concededTeamGoalsPerGame: number
  }