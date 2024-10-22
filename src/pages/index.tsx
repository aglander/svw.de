import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import usePlayerStats from '../hooks/usePlayerStats'
import { ISeason } from '../types/types';

const IndexPage: React.FC<PageProps> = () => {

  const currentSeason = '2024/2025'
  const { playerList, seasons } = usePlayerStats(currentSeason);

  // Funktion zur Abrufung der Saison
  const getSeasonByName = (seasons: ISeason[], seasonName: string): ISeason | null => {
    return seasons.find(season => season.name === seasonName) || null;
  };

  const numberOfGames = getSeasonByName(seasons, currentSeason)?.numberOfGames || 0

  const numberOfEntries = 10;

  const playersByGames = [...playerList].sort((p1, p2) => (p1.games > p2.games) ? -1 : (p1.games < p2.games) ? 1 : 0).slice(0, numberOfEntries);
  const playersByGoals = [...playerList].sort((p1, p2) => (p1.goals > p2.goals) ? -1 : (p1.goals < p2.goals) ? 1 : 0).slice(0, numberOfEntries);
  const playersByAssists = [...playerList].sort((p1, p2) => (p1.assists > p2.assists) ? -1 : (p1.assists < p2.assists) ? 1 : 0).slice(0, numberOfEntries);

  const filteredPlayers = playerList.filter((player) => player.games > numberOfGames / 2);

  const playersByPointsPerGame = [...filteredPlayers].sort((p1, p2) => (p1.pointsPerGame > p2.pointsPerGame) ? -1 : (p1.pointsPerGame < p2.pointsPerGame) ? 1 : 0).slice(0, numberOfEntries);
  const playersByGoalsPerGame = [...filteredPlayers].sort((p1, p2) => (p1.teamGoalsPerGame > p2.teamGoalsPerGame) ? -1 : (p1.teamGoalsPerGame < p2.teamGoalsPerGame) ? 1 : 0).slice(0, numberOfEntries);
  const playersByConcededGoalsPerGame = [...filteredPlayers].sort((p1, p2) => (p1.concededTeamGoalsPerGame > p2.concededTeamGoalsPerGame) ? 1 : (p1.concededTeamGoalsPerGame < p2.concededTeamGoalsPerGame) ? -1 : 0).slice(0, numberOfEntries);

  return (<div id="statsWidget">
    <div className="wp-block-columns is-layout-flex wp-container-3 wp-block-columns-is-layout-flex">
      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Spiele</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByGames.map((player) => <tr><td title={player.name}>{player.name}</td><td>{player.games}</td></tr>)}
        </tbody></table></figure>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Tore</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByGoals.map((player) => <tr><td title={player.name}>{player.name}</td><td>{player.goals}</td></tr>)}
        </tbody></table></figure>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Vorlagen</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByAssists.map((player) => <tr><td title={player.name}>{player.name}</td><td>{player.assists}</td></tr>)}
        </tbody></table></figure>
      </div>
    </div>

    <div className="wp-block-columns is-layout-flex wp-container-3 wp-block-columns-is-layout-flex">
      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Punkte pro Spiel</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByPointsPerGame.map((player) => <tr><td title={player.name}>{player.name}</td><td>{player.pointsPerGame.toFixed(1)}</td></tr>)}
        </tbody></table></figure>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Tore pro Spiel</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByGoalsPerGame.map((player) => <tr><td title={player.name}>{player.name}</td><td>{player.teamGoalsPerGame.toFixed(1)}</td></tr>)}
        </tbody></table></figure>
      </div>

      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <p><strong>Gegentore pro Spiel</strong></p>
        <figure className="wp-block-table"><table><tbody>
          {playersByConcededGoalsPerGame.map((player) => <tr><td title={player.name}>{player.name}</td><td>{player.concededTeamGoalsPerGame.toFixed(1)}</td></tr>)}
        </tbody></table></figure>
      </div>
    </div>
  </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
