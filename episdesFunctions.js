let allEpisodes = [];

const searchField = document.querySelector("#search-field");
searchField.addEventListener("input", searchEpisode);
document
  .querySelector("#episodesDropList")
  .addEventListener("change", selectSingleEpisode);

const clearEpisodes = () => {
  let main = document.querySelector(".all-episodes");
  main.innerHTML = "";
};

// Function to render a single episode and format it

function displayEpisode(singleEpisode) {
  let main = document.querySelector("main");
  let article = document.createElement("article");

  let h1 = document.createElement("h1");
  h1.innerText = getEpisodeName(singleEpisode); //
  let img = document.createElement("img");
  img.src = singleEpisode.image.medium;

  let div = document.createElement("div");
  div.innerHTML = singleEpisode.summary; //
  article.appendChild(h1);
  article.appendChild(img);
  article.appendChild(div);
  main.appendChild(article);
  article.className = "episode";
}

// function to format the episode name in a away Season Number followed by Episode Number such as S01E23

function getEpisodeName(singleEpisode) {
  return `${singleEpisode.name} - ${
    singleEpisode.season < 10
      ? "S0" + singleEpisode.season
      : "S" + singleEpisode.season
  }${
    singleEpisode.season < 10
      ? "E0" + singleEpisode.number
      : "E" + singleEpisode.number
  }
`;
}

// function to display the count of the Episode search result / over the total number of episodes
function ShowCount(resultCounter, allCounter) {
  const result = document.querySelector("#search-count");
  result.innerText = `Displaying ${resultCounter}/${allCounter} episodes..`;
}

// this function will be called to fill the list of Episodes when the Shows list is changed //
function fillDropList(episodes) {
  const episodeList = document.querySelector("#episodesDropList");
  episodeList.innerHTML = "";
  let option = document.createElement("option");
  option.text = "Select an Episode";
  option.value = 0;
  episodeList.add(option);

  episodes.forEach((item) => {
    let option = document.createElement("option");
    option.text = getEpisodeName(item);
    option.value = item.id;
    episodeList.add(option);
  });
  allEpisodes = [...episodes];
  console.log(allEpisodes, "--------data");
}

// Show a selected single episode from the drop list //
function selectSingleEpisode(e) {
  if (e.target.value == 0) {
    allEpisodes.forEach((episode) => displayEpisode(episode));
  } else {
    let singleResult = allEpisodes.filter(
      (episode) => episode.id == e.target.value
    );
    clearEpisodes();
    displayEpisode(singleResult[0]);
  }
}

// Search Episodes function //
function searchEpisode(e) {
  const inputValue = searchField.value;
  console.log(inputValue);
  console.log(
    allEpisodes.filter((episode) =>
      episode.name.toLowerCase().includes(inputValue.toLowerCase())
    )
  );

  let main = document.querySelector(".all-episodes");
  main.innerHTML = "";
  const searchResult = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      episode.summary.toLowerCase().includes(inputValue.toLowerCase())
  );

  searchResult.forEach((filtered) => displayEpisode(filtered));
  ShowCount(searchResult.length, allEpisodes.length);
}

// function to display all episodes passed in the data array
const showAllepisodes = (data) => {
  data.forEach((episode) => displayEpisode(episode));
};

export {
  displayEpisode,
  getEpisodeName,
  searchEpisode,
  fillDropList,
  selectSingleEpisode,
  showAllepisodes,
};
