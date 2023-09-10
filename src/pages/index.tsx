import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"

interface IPlayer {
  readonly name: string
  readonly games: number
  readonly goals: number
  readonly assists: number
  readonly points: number
  readonly pointsPerGame: number
  readonly teamGoalsPerGame: number
  readonly concededTeamGoalsPerGame: number
}

const IndexPage: React.FC<PageProps> = () => {

  const {
    playerStats: {
      nodes: playersAirtable
    },
    gameStats: {
      nodes: games
    }
  } = useStaticQuery(
    graphql`
    {
      playerStats: allAirtable(
        filter: {table: {eq: "players"}, data: {Games: {gt: 0}}}
      ) {
        nodes {
          data {
            name: Name,
            games: Games,
            goals: Goals,
            assists: Assists,
            points: Points,
            pointsPerGame: Points_per_Game
            teamGoalsPerGame: Team_Goals_per_Game
            concededTeamGoalsPerGame: Conceded_Team_Goals_per_Game
          }
        }
      }
      gameStats: allAirtable(filter: {table: {eq: "games"}, data: {Points: {ne: null}}}) {
        nodes {
          data {
            Opponent
          }
        }
      }
    }
  `
  )

  const players: IPlayer[] = []
  playersAirtable.map(function (val: { data: IPlayer }) {
    players.push(val.data)
  });

  const playersByGames: IPlayer[] = [...players].sort((p1, p2) => (p1.games > p2.games) ? -1 : (p1.games < p2.games) ? 1 : 0).slice(0, 5);
  const playersByGoals: IPlayer[] = [...players].sort((p1, p2) => (p1.goals > p2.goals) ? -1 : (p1.goals < p2.goals) ? 1 : 0).slice(0, 5);
  const playersByAssists: IPlayer[] = [...players].sort((p1, p2) => (p1.assists > p2.assists) ? -1 : (p1.assists < p2.assists) ? 1 : 0).slice(0, 5);
  const filteredPlayers = players.filter((player) => player.games > games.length / 2);
  const playersByPointsPerGame: IPlayer[] = [...filteredPlayers].sort((p1, p2) => (p1.pointsPerGame > p2.pointsPerGame) ? -1 : (p1.pointsPerGame < p2.pointsPerGame) ? 1 : 0).slice(0, 5);
  const playersByGoalsPerGame: IPlayer[] = [...filteredPlayers].sort((p1, p2) => (p1.teamGoalsPerGame > p2.teamGoalsPerGame) ? -1 : (p1.teamGoalsPerGame < p2.teamGoalsPerGame) ? 1 : 0).slice(0, 5);
  const playersByConcededGoalsPerGame: IPlayer[] = [...filteredPlayers].sort((p1, p2) => (p1.concededTeamGoalsPerGame > p2.concededTeamGoalsPerGame) ? 1 : (p1.concededTeamGoalsPerGame < p2.concededTeamGoalsPerGame) ? -1 : 0).slice(0, 5);

  return (<>
    <div className="wp-block-columns is-layout-flex wp-container-3 wp-block-columns-is-layout-flex">
      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Spiele</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByGames.map((player) => <tr><td>{player.name}</td><td>{player.games}</td></tr>)}
        </tbody></table></figure>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Tore</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByGoals.map((player) => <tr><td>{player.name}</td><td>{player.goals}</td></tr>)}
        </tbody></table></figure>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Vorlagen</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByAssists.map((player) => <tr><td>{player.name}</td><td>{player.assists}</td></tr>)}
        </tbody></table></figure>
      </div>
    </div>

    <div className="wp-block-columns is-layout-flex wp-container-3 wp-block-columns-is-layout-flex">
      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Punkte pro Spiel</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByPointsPerGame.map((player) => <tr><td>{player.name}</td><td>{player.pointsPerGame.toFixed(1)}</td></tr>)}
        </tbody></table></figure>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Tore pro Spiel</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByGoalsPerGame.map((player) => <tr><td>{player.name}</td><td>{player.teamGoalsPerGame.toFixed(1)}</td></tr>)}
        </tbody></table></figure>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Gegentore pro Spiel</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByConcededGoalsPerGame.map((player) => <tr><td>{player.name}</td><td>{player.concededTeamGoalsPerGame.toFixed(1)}</td></tr>)}
        </tbody></table></figure>
      </div>
    </div>

  </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
