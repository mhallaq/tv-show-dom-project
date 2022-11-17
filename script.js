//You can edit ALL of the code here
import {
  displayEpisode,
  getEpisodeName,
  searchEpisode,
  selectSingleEpisode,
  fillDropList,
  showAllepisodes,
} from "./episdesFunctions.js";

import {
  fillShowsList,
  displayShowEpisodes,
  clearEpisodes,
} from "./showsFunctions.js";

function setup() {
  //fetch Shows data
  const showList = document.querySelector("#showsDropList");
  const episodeList = document.querySelector("#episodesDropList");
  episodeList.innerText = "Select an Episode";

  console.log(showList);

  // const url = `https://api.tvmaze.com/shows/showId/episodes`;
  const showsUrl = "https://api.tvmaze.com/shows";

  fetch(showsUrl)
    .then((response) => response.json())
    .then((data) => {
      fillShowsList(data);
      showAllepisodes(data);
      showList.addEventListener("change", displayShowEpisodes);
      console.log(data, "-----------> All Shows <--------");
    })
    .catch((error) => console.log(error));

  // const showAllepisodes = (data) => {
  //   data.forEach((episode) => displayEpisode(episode));
  // };
}

window.onload = setup;
