import { fillDropList, showAllepisodes } from "./episdesFunctions.js";

const url = `https://api.tvmaze.com/shows/showId/episodes`;

//Clear Episodes container

const clearEpisodes = () => {
  let main = document.querySelector(".all-episodes");
  main.innerHTML = "";
};

// Function to fill the show List
function fillShowsList(shows) {
  shows.sort((a, b) => {
    let showName1 = a.name.toLowerCase();
    let showName2 = b.name.toLowerCase();
    if (showName1 < showName2) return -1;
    if (showName1 > showName2) return 1;
    return 0;
  });
  let showList = document.querySelector("#showsDropList");
  shows.forEach((item) => {
    let option = document.createElement("option");
    option.text = item.name;
    option.value = item.id;
    showList.add(option);
  });
  const allShows = [...shows];
  console.log(allShows, "--------All SHOWS data");
}

// function to fill the list of Episodes when a show is selected from the Show List
const displayShowEpisodes = (e) => {
  console.log(e.target.value);
  const showId = e.target.value;
  clearEpisodes();
  if (showId == 0) {
    setup();
  } else {
    const episodesUrl = url.replace("showId", showId);
    console.log(episodesUrl);
    fetch(episodesUrl)
      .then((response) => response.json())
      .then((data) => {
        fillDropList(data);
        showAllepisodes(data);
        console.log(data, "-----------> All Episoids <--------");
      })
      .catch((error) => console.log(error));
  }
};

export { fillShowsList, displayShowEpisodes, clearEpisodes };
