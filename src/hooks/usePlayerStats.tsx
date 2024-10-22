// usePlayerStats.tsx
import { useStaticQuery, graphql } from 'gatsby';
import { useMemo } from 'react';
import { IPlayer, ISeason, IPlayerStatsResult } from '../types/types';


const usePlayerStats = (seasonName?: string | null): IPlayerStatsResult => {
  const { stats, seasons } = useStaticQuery(
    graphql`
      {
        stats: allAirtable(filter: {table: {eq: "stats"}}) {
          nodes {
            data {
              Player
              Goals
              Assists
              Points
              teamGoals
              concededTeamGoals
              Date
            }
          }
        }
        seasons: allAirtable(filter: {table: {eq: "seasons"}}) {
          nodes {
            data {
              Name
              begins
              ends
              numberOfGames
            }
          }
        }
      }
    `
  )

  // Finde Saison-Daten nur, wenn eine Saison angegeben wurde
  const season = seasonName ? seasons.nodes.find((s) => s.data.Name === seasonName) : null;

  const seasonStart = season ? new Date(season.data.begins) : null;
  const seasonEnd = season ? new Date(season.data.ends) : null;

  // Aggregiere Statistiken für Spieler
  const playerList = useMemo(() => {
    return stats.nodes.reduce((acc: IPlayer[], stat) => {
      const playerName = stat.data.Player[0];
      const statDate = new Date(stat.data.Date[0]);

      // Nur filtern, wenn eine Saison vorhanden ist
      if (!season || (statDate >= seasonStart! && statDate <= seasonEnd!)) {
        const goals = stat.data.Goals || 0;
        const assists = stat.data.Assists || 0;
        const points = stat.data.Points ? stat.data.Points[0] : 0;
        const teamGoals = stat.data.teamGoals ? stat.data.teamGoals[0] : 0;
        const concededTeamGoals = stat.data.concededTeamGoals ? stat.data.concededTeamGoals[0] : 0;

        let player = acc.find(p => p.name === playerName);
        if (player) {
          player.games += 1;
          player.goals += goals;
          player.assists += assists;
          player.points += points;
          player.pointsPerGame = player.points / player.games;
          player.teamGoalsPerGame = (player.teamGoalsPerGame * (player.games - 1) + teamGoals) / player.games;
          player.concededTeamGoalsPerGame = (player.concededTeamGoalsPerGame * (player.games - 1) + concededTeamGoals) / player.games;
        } else {
          acc.push({
            name: playerName,
            games: 1,
            goals,
            assists,
            points,
            pointsPerGame: points,
            teamGoalsPerGame: teamGoals,
            concededTeamGoalsPerGame: concededTeamGoals,
          });
        }
      }

      return acc;
    }, []);
  }, [stats.nodes, seasonStart, seasonEnd]);

  // Saison-Daten formatieren
  const formattedSeasons: ISeason[] = seasons.nodes.map((s) => ({
    name: s.data.Name,
    begins: s.data.begins,
    ends: s.data.ends,
    numberOfGames: s.data.numberOfGames,
  }));

  return { playerList, seasons: formattedSeasons };
};

export default usePlayerStats;