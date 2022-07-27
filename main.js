const fearless = [
    {name: 'Change', tv: 0.100, sv: 0.1234},
    {name: 'Fearless', tv: 0.150, sv: 0.1234},
    {name: 'Fifteen', tv: 0.200, sv: 0.1234},
    {name: 'Love Story', tv: 0.250, sv: 0.1234},
    {name: 'Hey Stephen', tv: 0.300, sv: 0.1234},
    {name: 'White Horse', tv: 0.350, sv: 0.1234},
    {name: 'You Belong With Me', tv: 0.450, sv: 0.1234},
    {name: 'Breathe', tv: 0.500, sv: 0.1234},
    {name: 'Tell Me Why', tv: 0.550, sv: 0.1234},
    {name: 'You\'re Not Sorry', tv: 0.600, sv: 0.1234},
    {name: 'The Way I Loved You', tv: 0.650, sv: 0.1234},
    {name: 'Forever & Always', tv: 0.700, sv: 0.1234},
    {name: 'The Best Day', tv: 0.750, sv: 0.1234},
]

const tableBody = document.getElementById('table-body');

window.addEventListener('load', (event) => {
    for (let index = 0; index < fearless.length; index++) {

      let songRow = document.createElement('tr');
      tableBody.append(songRow);
      let name = document.createElement('td');
      name.innerHTML = fearless[index]['name'];
      songRow.append(name);

      if (fearless[index]['tv'] > fearless[index]['sv']) {
        let tvGreen = document.createElement('div');
        tvGreen.classList.add('alert');
        tvGreen.classList.add('uk-alert-success');
        tvGreen.innerHTML = fearless[index]['tv'];
        const tv = document.createElement('td');
        tv.append(tvGreen);
        songRow.append(tv);
        let svRed = document.createElement('div');
        svRed.classList.add('alert');
        svRed.classList.add('uk-alert-danger');
        svRed.innerHTML = fearless[index]['sv'];
        const sv = document.createElement('td');
        sv.append(svRed);
        songRow.append(sv);
      }
      else {
        let tvRed = document.createElement('div');
        tvRed.classList.add('alert');
        tvRed.classList.add('uk-alert-danger');
        tvRed.innerHTML = fearless[index]['tv'];
        const tv = document.createElement('td');
        tv.append(tvRed);
        songRow.append(tv);
        let svGreen = document.createElement('div');
        svGreen.classList.add('alert');
        svGreen.classList.add('uk-alert-success');
        svGreen.innerHTML = fearless[index]['sv'];
        const sv = document.createElement('td');
        sv.append(svGreen);
        songRow.append(sv);
      }
      const stats = document.createElement('td');
      stats.innerHTML += '<button class="uk-button uk-button-default" type="button" uk-toggle="target: #modal-stats">Stats</button>'
      songRow.append(stats);
      songRow.innerHTML += '<div id="modal-stats" uk-modal><div class="uk-modal-dialog uk-modal-body"><h2 class="uk-modal-title">Headline</h2><p>Placeholder</p><p class="uk-text-right"><button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button></p></div></div>'
      const modal = document.getElementById('modal-stats');
    }
});

const fearlessButton = document.getElementById('fearless-btn');

fearlessButton.addEventListener('click', function onClick(event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #eccc8c 100%)';
});

const redButton = document.getElementById('red-btn');

redButton.addEventListener('click', function onClick(event) {
    document.body.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, #d4ac9c 100%)';
});

function sortTable(n) {
  var rows, index, first, second, should, count = 0;
  var table = document.getElementById("full-table");
  var switching = true;
  var dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
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
