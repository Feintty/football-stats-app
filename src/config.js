const url = 'https://api.football-data.org/'
export default {
    competitions: `${url}v2/competitions`,
    apiKey:"b6b49b0c1b124e71b892c2ca57b02f7c",
    matchesByLeagueId: (id) =>`${url}v2/competitions/${id}/matches`,
    teams: `${url}v2/teams`,
    teamById: (id)=> `${url}v2/teams/${id}`,
    matchesByTeamId: (id)=> `${url}v2/teams/${id}/matches`,
    availableLeagues:[2000,2001,2002,2003,2013,2014,2015,2016,2017,2018,2019,2021]
}