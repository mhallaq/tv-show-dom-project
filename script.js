//You can edit ALL of the code here
function setup() {
  //fetch Shows data
  let showList = document.querySelector("#showsDropList");
  const episodeList = document.querySelector("#episodesDropList");
  episodeList.innerText = "Select an Episode";
  console.log(showList);

  const url = `https://api.tvmaze.com/shows/showId/episodes`;
  const showsUrl = "https://api.tvmaze.com/shows";
  let allEpisodes = [];

  fetch(showsUrl)
    .then((response) => response.json())
    .then((data) => {
      fillShowsList(data);
      showAllepisodes(data);
      showList.addEventListener("change", displayEpisodes);
      console.log(data, "-----------> All Shows <--------");
    })
    .catch((error) => console.log(error));

  const clearEpisodes = () => {
    let main = document.querySelector(".all-episodes");
    main.innerHTML = "";
  };
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

  // fetch Episiods data

  const displayEpisodes = (e) => {
    console.log(e.target.value);
    const showId = e.target.value;
    clearEpisodes();
    if (showId == 0) {
      setup();
    } else {
      episodesUrl = url.replace("showId", showId);
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

  // console.log(allEpisodes);
  //const allEpisodes = getAllEpisodes();

  const showAllepisodes = (data) => {
    data.forEach((episode) => displayEpisode(episode));
  };

  // fillDropList(allEpisodes);

  searchField = document.querySelector("#search-field");
  searchField.addEventListener("input", searchEpisode);

  function ShowCount(resultCounter, allCounter) {
    result = document.querySelector("#search-count");
    result.innerText = `Displaying ${resultCounter}/${allCounter} episodes..`;
  }

  function searchEpisode(e) {
    inputValue = searchField.value;
    console.log(inputValue);
    console.log(
      allEpisodes.filter((episode) =>
        episode.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );

    let main = document.querySelector(".all-episodes");
    main.innerHTML = "";
    searchResult = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        episode.summary.toLowerCase().includes(inputValue.toLowerCase())
    );

    searchResult.forEach((filtered) => displayEpisode(filtered));
    ShowCount(searchResult.length, allEpisodes.length);
  }

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
    allShows = [...shows];
    console.log(allShows, "--------All SHOWS data");
  }

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

  document
    .querySelector("#episodesDropList")
    .addEventListener("change", selectSingleEpisode);

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
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

window.onload = setup;
