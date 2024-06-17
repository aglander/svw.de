import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import IPlayer from "../components/IPlayer"

const AllPage: React.FC<PageProps> = () => {

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

  const playersByGames: IPlayer[] = [...players].sort((p1, p2) => (p1.games > p2.games) ? -1 : (p1.games < p2.games) ? 1 : 0);

  return (<div id="statsWidget">
    <a href="javascript:history.back()">⬅️ zurück</a>
    <div className="wp-block-columns is-layout-flex wp-container-3 wp-block-columns-is-layout-flex">
      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <figure className="wp-block-table">
          <table>
            <thead>
              <tr><th></th><th colSpan={3}>Individuell</th><th colSpan={3}>Team</th></tr>
              <tr><th>Spieler</th><th title="Spiele">S</th><th title="Tore">T</th><th title="Vorlagen">V</th><th title="Punkte pro Spiel">P</th><th title="Tore pro Spiel">T</th><th title="Gegentore pro Spiel">G</th></tr>
            </thead>
            <tbody>
          {playersByGames.map((player, index) => <tr><td title={player.name}>{index+1}. {player.name}</td><td>{player.games}</td><td>{player.goals}</td><td>{player.assists}</td><td>{player.pointsPerGame.toFixed(1)}</td><td>{player.teamGoalsPerGame.toFixed(1)}</td><td>{player.concededTeamGoalsPerGame.toFixed(1)}</td></tr>)}
        </tbody></table></figure>
      </div>
    </div>
  </div>
  )
}

export default AllPage

export const Head: HeadFC = () => <title>All Page</title>
