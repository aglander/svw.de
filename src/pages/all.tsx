import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import usePlayerStats from '../hooks/usePlayerStats'
import { useState } from 'react'

const AllPage: React.FC<PageProps> = () => {

  const [selectedSeason, setSelectedSeason] = useState<string | null>('2024/2025');
  const { playerList, seasons } = usePlayerStats(selectedSeason);
  // Sortiere Spieler nach der Anzahl der Spiele
  const sortedPlayers = [...playerList].sort((a, b) => b.games - a.games);

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason); // Jetzt kannst du eine Zeichenkette setzen
  };

  return (<div id="statsWidget">
   

    <div className="wp-block-columns is-layout-flex wp-container-3 wp-block-columns-is-layout-flex">
      <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <figure className="wp-block-table">
          <table>
            <thead>
              <tr>
                <th><div>
        <select id="season-select" onChange={handleSeasonChange} value={selectedSeason || ""}>
          <option value="all">Alle Saisons</option>
          {seasons.map(season => (
            <option key={season.name} value={season.name}>
              {season.name}
            </option>
          ))}
        </select>
      </div></th><th colSpan={3}>Individuell</th><th colSpan={3}>Team</th></tr>
              <tr><th>Spieler</th><th title="Spiele">S</th><th title="Tore">T</th><th title="Vorlagen">V</th><th title="Punkte pro Spiel">P</th><th title="Tore pro Spiel">T</th><th title="Gegentore pro Spiel">G</th></tr>
            </thead>
            <tbody>
          {sortedPlayers.map((player, index) => <tr><td title={player.name}>{index+1}. {player.name}</td><td>{player.games}</td><td>{player.goals}</td><td>{player.assists}</td><td>{player.pointsPerGame.toFixed(1)}</td><td>{player.teamGoalsPerGame.toFixed(1)}</td><td>{player.concededTeamGoalsPerGame.toFixed(1)}</td></tr>)}
        </tbody></table></figure>
      </div>
    </div>
  </div>
  )
}

export default AllPage

export const Head: HeadFC = () => <title>All Page</title>
