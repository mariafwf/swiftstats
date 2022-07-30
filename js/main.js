import albumsJSON from './albums_all.json' assert {type: 'json'};

let taylorswift = []; let fearless = []; let speaknow = []; let red = []; let a1989 = []; 
let reputation = []; let lover = []; let folklore = []; let evermore = [];

// helper functions to import albums from JSON
function createTS() {
  for (const element of albumsJSON.taylorswift) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    taylorswift.push(newSong);
  }
}
function createFearless() {
  for (const element of albumsJSON.fearless) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    fearless.push(newSong);
  }
}
function createSN() {
  for (const element of albumsJSON.speaknow) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    speaknow.push(newSong);
  }
}
function createRed() {
  for (const element of albumsJSON.red) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    red.push(newSong);
  }
}
function create1989() {
  for (const element of albumsJSON.album1989) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    a1989.push(newSong);
  }
}
function createRep() {
  for (const element of albumsJSON.reputation) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    reputation.push(newSong);
  }
}
function createLover() {
  for (const element of albumsJSON.lover) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    lover.push(newSong);
  }
}
function createFolklore() {
  for (const element of albumsJSON.folklore) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    folklore.push(newSong);
  }
}
function createEvermore() {
  for (const element of albumsJSON.evermore) {
    const newSong = {};
    newSong.name = element.name;
    newSong.popularity = element.popularity;
    evermore.push(newSong);
  }
}
function createAlbums() {
  createTS();
  createFearless();
  createSN();
  createRed();
  create1989();
  createRep();
  createLover();
  createFolklore();
  createEvermore();
}

createAlbums();

const tableDiv = document.getElementById('table-div');

function createTable(album) {
  // new table with UIKit classes
  let table = document.createElement('table');
  table.classList.add('uk-table');
  table.classList.add('uk-table-hover');
  table.classList.add('uk-table-divider');
  table.setAttribute("id", "new-table")
  // new table header
  let tHead = document.createElement('thead');
  table.append(tHead);
  let header = document.createElement('tr');
  tHead.append(header);
  // new table body
  let body = document.createElement('tbody');
  // th for name
  let nameHead = document.createElement('th');
  nameHead.innerHTML = 'Name';
  header.append(nameHead);
  // th for popularity
  let popularityHead = document.createElement('th');
  popularityHead.innerHTML = 'Popularity Index';
  // popularityHead.onclick = sortTable(1);
  header.append(popularityHead);
  // blank th for stats
  let statsHead = document.createElement('th');
  statsHead.innerHTML = '';
  header.append(statsHead);
  // loop through each song in the album array
  for (const song of album) {
    // row for individual the song
    let row = document.createElement('tr');
    body.append(row);
    // column with song name
    let name = document.createElement('td');
    name.innerHTML = song['name'];
    row.append(name);
    // column with popularity
    let popularity = document.createElement('td');
    popularity.innerHTML = song['popularity'];
    row.append(popularity);
    // column with 'show stats' button
    let statsData = document.createElement('td');
    let statsButton = document.createElement('button');
    statsButton.innerHTML += 'Show Stats'
    statsData.append(statsButton);
    row.append(statsData);
    // add table to html code
    table.append(body);
    tableDiv.append(table);
  }
}

/*
function createComparison(album) {
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
    }
}
*/

function deleteTable() {
  let table = document.getElementById('new-table');
  table.remove();
}

createTable(fearless);


window.addEventListener('load', (_event) => {
});

const tsButton = document.getElementById('ts-btn');
tsButton.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #00a3ad 100%)';
    deleteTable();
    createTable(taylorswift);
});


const fearlessButton = document.getElementById('fearless-btn');
fearlessButton.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #eccc8c 100%)';
    deleteTable();
    createTable(fearless);
});

const speaknowButton = document.getElementById('speaknow-btn');
speaknowButton.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #52316b 100%)';
    deleteTable();
    createTable(speaknow);
});

const redButton = document.getElementById('red-btn');
redButton.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #d4ac9c 100%)';
    deleteTable();
    createTable(red);
});

const a1989Button = document.getElementById('a1989-btn');
a1989Button.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #4d5266 100%)';
    deleteTable();
    createTable(a1989);
});

const repButton = document.getElementById('rep-btn');
repButton.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgb(226, 224, 224) 100%)';
    deleteTable();
    createTable(reputation);
});

const loverButton = document.getElementById('lover-btn');
loverButton.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #ebbad1 100%)';
    deleteTable();
    createTable(lover);
});

const folkloreButton = document.getElementById('folklore-btn');
folkloreButton.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #7f7f7f 100%)';
    deleteTable();
    createTable(folklore);
});

const evermoreButton = document.getElementById('evermore-btn');
evermoreButton.addEventListener('click', function onClick(_event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #334941 100%)';
    deleteTable();
    createTable(evermore);
});


function sortTable(n) {
  let table = document.getElementById('new-table');
  if (table.rows.length == 0) {
    console.log("table is empty");
  }
  else {
    let rows, index, first, second, should, count = 0;
    let switching = true;
    let dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows.length;
      for (index = 1; index < (rows.length - 1); index++) {
        should = false;
        first = rows[index].getElementsByTagName("td")[n];
        second = rows[index + 1].getElementsByTagName("td")[n];
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
