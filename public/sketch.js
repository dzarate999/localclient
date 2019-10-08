//Loading P5 Library
function setup() {
    //Init Webcam & remove default P5 canvas
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160,120);

    let lat, lon;

    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const feels = document.getElementById('feels').value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const data = { lat, lon, feels, image64 };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
    });


    if ("geolocation" in navigator) {
        /* geolocation is available */
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('lat').textContent = lat.toFixed(2);
            document.getElementById('lon').textContent = lon.toFixed(2);
            const mymap = L.map('myLoc').setView([lat, lon], 15);
            const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
            const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileURL, { attribution });
            tiles.addTo(mymap);
            L.marker([lat, lon]).addTo(mymap);
        });

    } else {
        /* geolocation IS NOT available */
        console.log('geolocation unavailable');
    }
}