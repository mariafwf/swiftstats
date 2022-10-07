import albumsJSON from "/backend/album-stats.json" assert { type: "json" };
import compareJSON from "/backend/comparison.json" assert { type: "json" };

let titles = ["Taylor Swift", "Fearless (Taylor's Version)", "Speak Now (Deluxe Package)", "RED (Taylor's Version)", 
              "1989 (Deluxe)", "reputation", "Lover", "folklore (deluxe version)", "evermore (deluxe version)"]

const tableDiv = document.getElementById("table-div");
let siteName = document.getElementById("swiftstats")
let page = document.body;

function createTable(album) {
  if (document.contains(document.getElementById("new-table"))) {
    document.getElementById("new-table").remove();
  }
  // sort album in descending order
  album.sort((x, y) => x.popularity < y.popularity ? 1 : x.popularity === y.popularity ? x.name > y.name ? 1 : -1 : -1);
  // album title
  if (!document.contains(document.getElementById("new-title"))) {
    let title = document.createElement("div");
    title.setAttribute("id", "new-title");
    title.classList.add('title');
    switch(album) {
      case albumsJSON.taylorswift:
        title.innerHTML = titles[0];
        title.style.fontFamily = 'Satisfaction';
        title.style.color = '#fff';
        title.style.fontSize = '36px';
        siteName.style.color = '#fff';
        page.style.backgroundImage = 'url(assets/img/debut.jpg)';
        break;
      case albumsJSON.fearless:
        title.innerHTML = titles[1];
        title.style.fontFamily = 'Germany Sans';
        title.style.color = '#eccc8c';
        title.style.fontSize = '36px';
        siteName.style.color = '#000';
        page.style.backgroundImage = 'url(assets/img/fearless.jpg)';
        break;
      case albumsJSON.speaknow:
        title.innerHTML = titles[2];
        title.style.fontFamily = 'Satisfaction';
        title.style.color = '#52316b';
        title.style.fontSize = '36px';
        siteName.style.color = '#000';
        page.style.backgroundImage = 'url(assets/img/speaknow.jpg)';
        break;
      case albumsJSON.red:
        title.innerHTML = titles[3];
        title.style.fontFamily = 'Heading Pro';
        title.style.color = '#94242c';
        siteName.style.color = '#000';
        page.style.backgroundImage = 'url(assets/img/red.jpg)';
        break;
      case albumsJSON.a1989:
        title.innerHTML = titles[4];
        title.style.fontFamily = 'Briannes hand';
        title.style.color = '#d7d8ce';
        siteName.style.color = '#000';
        page.style.backgroundImage = 'url(assets/img/a1989.jpg)';
        break;
      case albumsJSON.reputation:
        title.innerHTML = titles[5];
        title.style.fontFamily = 'Engravers Old English';
        title.style.color = '#fff';
        siteName.style.color = '#fff';
        page.style.backgroundImage = 'url(assets/img/rep.jpg)';
        break
      case albumsJSON.lover:
        title.innerHTML = titles[6];
        title.style.fontFamily = 'Bonita';
        title.style.color = '#b2426f';
        siteName.style.color = '#000';
        page.style.backgroundImage = 'url(assets/img/lover.jpeg)';
        break;
      case albumsJSON.folklore:
        title.innerHTML = titles[7];
        title.style.fontFamily = 'IM FELL';
        title.style.color = '#2e2e2e';
        siteName.style.color = '#000';
        page.style.backgroundImage = 'url(assets/img/folklore.jpg)';
        break;
      case albumsJSON.evermore:
        title.innerHTML = titles[8];
        title.style.fontFamily = 'IM FELL';
        title.style.color = '#d2936c';
        siteName.style.color = '#000';
        page.style.backgroundImage = 'url(assets/img/evermore.jpg)';
      break;
      default:
        break;
    }
    // show comparison button
    switch(album) {
      case albumsJSON.fearless:
        let comparisonF = document.createElement("button");
        comparisonF.innerHTML = "Compare to original version";
        comparisonF.classList.add("compare-btn");
        comparisonF.setAttribute("id", "comparison-btn");
        album == albumsJSON.fearless ? comparisonF.classList.add("fearless-compare") : comparisonF.classList.add("red-compare");
        comparisonF.onclick = function() {createComparison(compareJSON.fearless)};
        title.append(comparisonF);
        tableDiv.append(title);
        break;
      case albumsJSON.red:
        let comparisonR = document.createElement("button");
        comparisonR.innerHTML = "Compare to original version";
        comparisonR.classList.add("compare-btn");
        comparisonR.setAttribute("id", "comparison-btn");
        album == albumsJSON.fearless ? comparisonR.classList.add("fearless-compare") : comparisonR.classList.add("red-compare");
        comparisonR.onclick = function() {createComparison(compareJSON.fearless)};
        title.append(comparisonR);
        tableDiv.append(title);
        break;

      default:
        break;
    }
  }
  // new table with UIKit classes
  let table = document.createElement("table");
  table.classList.add("uk-table");
  table.classList.add("uk-table-hover");
  table.classList.add("uk-table-divider");
  table.setAttribute("id", "new-table");
  // new table header
  let tHead = document.createElement("thead");
  table.append(tHead);
  let header = document.createElement("tr");
  tHead.append(header);
  // new table body
  let body = document.createElement("tbody");
  // blank th for position
  let positionHead = document.createElement("th");
  positionHead.innerHTML = "";
  header.append(positionHead);
  // th for name
  let nameHead = document.createElement("th");
  nameHead.innerHTML = "Name";
  nameHead.classList.add("uk-text-left");
  header.append(nameHead);
  // th(s) for popularity
  let popularityHead = document.createElement("th");
  popularityHead.innerHTML = "Popularity";
  popularityHead.setAttribute("id", "popHeader");
  header.append(popularityHead);
  let position = 1;
  // loop through each song in the album array
  for (const song of album) {
    // row for individual the song
    let row = document.createElement("tr");
    body.append(row);
    // column with song name
    let pos = document.createElement("td");
    pos.innerHTML = position;
    position++;
    pos.classList.add("uk-text-left");
    row.append(pos);
    // column with song name
    let name = document.createElement("td");
    name.innerHTML = song["name"];
    name.classList.add("uk-text-left");
    row.append(name);
    // column with popularity
    let popularity = document.createElement("td");
    popularity.innerHTML = song["popularity"];
    row.append(popularity);
    // add table to html code
    table.append(body);
    tableDiv.append(table);
  }
  popularityHead.onclick = function() {
  if (table.rows.length == 0) {
    console.log("table is empty");
  } else {
    let rows,
      index,
      first,
      second,
      should,
      count = 0;
    let switching = true;
    let dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows.length;
      for (index = 1; index < rows.length - 1; index++) {
        should = false;
        first = rows[index].getElementsByTagName("td")[0];
        second = rows[index + 1].getElementsByTagName("td")[0];
        if (dir == "asc") {
          if (first.innerHTML.toLowerCase() > second.innerHTML.toLowerCase()) {
            should = true;
            break;
          }
        } else if (dir == "desc") {
          if (first.innerHTML.toLowerCase() < second.innerHTML.toLowerCase()) {
            should = true;
            break;
          }
        }
      }
      if (should) {
        rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
        switching = true;
        count++;
      } else {
        if (count == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
}


let nav = document.getElementById('nav');


function createNav() {
  let swiftstats = document.getElementById("swiftstats");
  swiftstats.classList.add('nav-name');
  nav.append(swiftstats);
  tsButton.classList.add('nav-btn');
  nav.append(tsButton);
  fearlessButton.classList.add('nav-btn');
  nav.append(fearlessButton);
  speaknowButton.classList.add('nav-btn');
  nav.append(speaknowButton);
  redButton.classList.add('nav-btn');
  nav.append(redButton);
  a1989Button.classList.add('nav-btn');
  nav.append(a1989Button);
  repButton.classList.add('nav-btn');
  nav.append(repButton);
  loverButton.classList.add('nav-btn');
  nav.append(loverButton);
  folkloreButton.classList.add('nav-btn');
  nav.append(folkloreButton);
  evermoreButton.classList.add('nav-btn');
  nav.append(evermoreButton);
}

function createComparison(album) {
  document.getElementById("new-table").remove();
  let btn = document.getElementById("comparison-btn");
  btn.innerHTML = "Hide Comparison";
  btn.onclick = function() {createTable(album)};
  // new table with UIKit classes
  let table = document.createElement("table");
  table.classList.add("uk-table");
  table.classList.add("uk-table-hover");
  table.classList.add("uk-table-divider");
  table.style.width = "75%";
  table.setAttribute("id", "new-table");
  // new table header
  let tHead = document.createElement("thead");
  table.append(tHead);
  let header = document.createElement("tr");
  tHead.append(header);
  // new table body
  let body = document.createElement("tbody");
  // blank th for position
  let positionHead = document.createElement("th");
  positionHead.innerHTML = "";
  header.append(positionHead);
  // th for name
  let nameHead = document.createElement("th");
  nameHead.innerHTML = "Name";
  nameHead.classList.add("uk-text-left");
  header.append(nameHead);
  // th(s) for popularity
  let taylorsVersion = document.createElement("th");
  taylorsVersion.innerHTML = "Taylor's Version";
  header.append(taylorsVersion);
  let originalVersion = document.createElement("th");
  originalVersion.innerHTML = "Original Version";
  header.append(originalVersion);
  let position = 1;
  // loop through each song in the album array
  for (const song of album) {
    // row for individual the song
    let row = document.createElement("tr");
    body.append(row);
    // column with song name
    let pos = document.createElement("td");
    pos.innerHTML = position;
    position++;
    pos.classList.add("uk-text-left");
    row.append(pos);
    // column with song name
    let name = document.createElement("td");
    name.innerHTML = song["name"];
    name.classList.add("uk-text-left");
    row.append(name);
    // columns with popularity
    let tv = document.createElement("td");
    tv.innerHTML = song["tv_pi"];
    row.append(tv);
    let sv = document.createElement("td");
    sv.innerHTML = song["sv_pi"];
    row.append(sv);
    // add table to html code
    table.append(body);
    tableDiv.append(table);
  }

    /*

    if (element['tv'] > element['sv']) {
      let tvGreen = document.createElement('div');
      tvGreen.classList.add('alert');
      tvGreen.classList.add('uk-alert-success');
      tvGreen.innerHTML = element['tv'];
      const tv = document.createElement('td');
      tv.append(tvGreen);
      songRow.append(tv);
      let svRed = document.createElement('div');
      svRed.classList.add('alert');
      svRed.classList.add('uk-alert-danger');
      svRed.innerHTML = element['sv'];
      const sv = document.createElement('td');
      sv.append(svRed);
      songRow.append(sv);
    }
    else {
      let tvRed = document.createElement('div');
      tvRed.classList.add('alert');
      tvRed.classList.add('uk-alert-danger');
      tvRed.innerHTML = element['tv'];
      const tv = document.createElement('td');
      tv.append(tvRed);
      songRow.append(tv);
      let svGreen = document.createElement('div');
      svGreen.classList.add('alert');
      svGreen.classList.add('uk-alert-success');
      svGreen.innerHTML = element['sv'];
      const sv = document.createElement('td');
      sv.append(svGreen);
      songRow.append(sv);

      */
}

const statsDiv = document.getElementById("stats-div");

function createStats(song) {
  // name and general stats
  let nameDiv = document.createElement("div");
  let lengthDiv = document.createElement("div");
  let releaseDiv = document.createElement("div");
  // audio features
  let popularity = document.createElement("progress");
  let acousticness = document.createElement("progress");
  let danceability = document.createElement("progress");
  let energy = document.createElement("progress");
  let liveness = document.createElement("progress");
  let loudness = document.createElement("progress");
  let speechiness = document.createElement("progress");
  let tempo = document.createElement("progress");
  let audioFeatures = [popularity, acousticness, danceability, energy, liveness, loudness, speechiness, tempo];
  let audioTitles = ["popularity", "acousticness", "danceability", "energy", "liveness", "loudness", "speechiness", "tempo"];
  let maxVals = [100, 1, 1, 1, 1, 0, 1, 300];
  let index = 0;

  for (const feature of audioFeatures) {
    let title = document.createElement("div");
    title.innerHTML = audioTitles[index] + " " + song[audioTitles[index]];
    feature.setAttribute("max", maxVals[index]);
    feature.setAttribute("value", song[audioTitles[index]]);
    feature.classList.add("uk-progress");
    statsDiv.append(title);
    statsDiv.append(feature);
    index++;
  }
}

function redesign() {
  if (document.contains(document.getElementById("btn-div"))) {
    document.getElementById("btn-div").remove();
    document.getElementById("intro-div").remove();
  }
  if (document.contains(document.getElementById("new-table"))) {
    document.getElementById("new-table").remove();
    document.getElementById("new-title").remove();
  }
}

const tsButton = document.getElementById("ts-btn");
tsButton.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.taylorswift);
});

const fearlessButton = document.getElementById("fearless-btn");
fearlessButton.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.fearless);
});

const speaknowButton = document.getElementById("speaknow-btn");
speaknowButton.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.speaknow);
});

const redButton = document.getElementById("red-btn");
redButton.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.red);
});

const a1989Button = document.getElementById("a1989-btn");
a1989Button.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.a1989);
});

const repButton = document.getElementById("rep-btn");
repButton.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.reputation);
});

const loverButton = document.getElementById("lover-btn");
loverButton.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.lover);
});

const folkloreButton = document.getElementById("folklore-btn");
folkloreButton.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.folklore);
});

const evermoreButton = document.getElementById("evermore-btn");
evermoreButton.addEventListener("click", function onClick(_event) {
  createNav();
  redesign();
  createTable(albumsJSON.evermore);
});

