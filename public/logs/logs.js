getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

for (item of data) { // deepscan-disable-line
    const root = document.createElement('p');
    root.setAttribute('id', 'root');
    const date = document.createElement('div');
    date.setAttribute('id', 'date');
    const mood = document.createElement('div');
    const lat = document.createElement('div');
    const lon = document.createElement('div');
    const image = document.createElement('img');


    const dateString  = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;


    if (item.feels === undefined) {
        mood.textContent = 'Mood: None';
    } else {
        mood.textContent = `Mood: ${item.feels}`;
    }
    
    lat.textContent = `Latitude: ${item.lat}`;
    lon.textContent = `Longitude: ${item.lon}`;

    if(item.image64 === undefined) {
        image.textContent = 'No Image Found';
    } else {
        image.src = item.image64;
    }

    root.append(date, mood, lat, lon, image);
    document.body.append(root);
    }
}
