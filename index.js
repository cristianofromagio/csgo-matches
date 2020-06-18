const { HLTV } = require('hltv');
const { DateTime } = require('luxon');

const teams = HLTV.getTeamRanking({country:'Brazil'});
const matches = HLTV.getMatches();

Promise.all([teams,matches])
  .then((res) => {
    const brTeams = res[0];
    const allMatches = res[1];
    const teamsId = brTeams.map((t) => t.team.id);

    const brMatches = allMatches.filter((match) => {
      if (match.team1 && match.team2) {
        return teamsId.indexOf(match.team1.id)>=0 || teamsId.indexOf(match.team2.id)>=0;
      }
      return false;
    });
    
    const display = brMatches.map((match) => {
      return {
      	
        'date': (match.date) ? DateTime.fromMillis(match.date, {zone:'America/Sao_Paulo',locale:'pt-br'}).toLocaleString(DateTime.DATETIME_SHORT) : '-',
        'team1': match.team1.name,
        'team2': match.team2.name,
        'event': match.event.name,
        'stars': match.stars
      };
    });

    //console.table(display);
    console.log(display);
  })
  .catch((err) => console.log(err))
  .finally(() => console.log('END'));
