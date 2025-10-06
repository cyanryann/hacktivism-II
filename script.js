
var results = document.getElementById("results");
var list = document.querySelector(".main");
var params = {
    apikey: '043f26b46186533915c029fa70951b98',
    ip: '8.8.8.8'
};
var url;
const proxyBase = "https://hacktivism-cors.onrender.com/proxy";
async function fetchIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
}



async function fetchData() {
    try {
        results.innerText = "Loading data...";
        params.ip = await fetchIP();
        if (!params.ip) {
            results.innerText = 'Could not get your IP.';
            return;
        }
        const queryString = new URLSearchParams(params).toString();
        const targetUrl = `https://hub.juheapi.com/aqi/v1/ip?${queryString}`;
        const proxyResponse = await axios.get(proxyBase, {
            params: {
                url: targetUrl
            }
        });
        const data = proxyResponse.data.data;
        console.log(data);
        results.innerText = "Your closest city is " + data.city;
        loadData(data);
        } catch (error)
    {
        console.error('Error fetching data: ', error);
        return null;  
    }
}

function loadData(data) 
{
    var city = data.city;
    var aqi = data.aqi;
    var co = data.co;
    var no2 = data.no2;
    var o3 = data.o3;
    var pm10 = data.pm10;
    var pm25 = data.pm25;
    var so2 = data.so2;
    const aqiDiv = document.createElement("div");
    const aqiHead = document.createElement("h3");
    const aqiBody = document.createElement("p");
    aqiHead.textContent = "Air Quality Index (AQI)";
    aqiBody.textContent = aqi;
    aqiDiv.appendChild(aqiHead);
    aqiDiv.appendChild(aqiBody);
    list.appendChild(aqiDiv);
    const coDiv = document.createElement("div");
    const coHead = document.createElement("h3");
    const coBody = document.createElement("p");
    coHead.textContent = "Carbon Monoxide (CO)";
    coBody.textContent = co;
    coDiv.appendChild(coHead);
    coDiv.appendChild(coBody);
    list.appendChild(coDiv);
    const no2Div = document.createElement("div");
    const no2Head = document.createElement("h3");
    const no2Body = document.createElement("p");
    no2Head.textContent = "Nitrogen Dioxide (NO2)";
    no2Body.textContent = no2;
    no2Div.appendChild(no2Head);
    no2Div.appendChild(no2Body);
    list.appendChild(no2Div);
    const o3Div = document.createElement("div");
    const o3Head = document.createElement("h3");
    const o3Body = document.createElement("p");
    o3Head.textContent = "Ozone (O3)";
    o3Body.textContent = o3;
    o3Div.appendChild(o3Head);
    o3Div.appendChild(o3Body);
    list.appendChild(o3Div);
    const pm10Div = document.createElement("div");
    const pm10Head = document.createElement("h3");
    const pm10Body = document.createElement("p");
    pm10Head.textContent = "Particulate Matter 10 (PM10)";
    pm10Body.textContent = pm10;
    pm10Div.appendChild(pm10Head);
    pm10Div.appendChild(pm10Body);
    list.appendChild(pm10Div);
    const pm25Div = document.createElement("div");
    const pm25Head = document.createElement("h3");
    const pm25Body = document.createElement("p");
    pm25Head.textContent = "Particulate Matter 25 (PM25)";
    pm25Body.textContent = pm25;
    pm25Div.appendChild(pm25Head);
    pm25Div.appendChild(pm25Body);
    list.appendChild(pm25Div);
    const so2Div = document.createElement("div");
    const so2Head = document.createElement("h3");
    const so2Body = document.createElement("p");
    so2Head.textContent = "Sulfur Dioxide (SO2)";
    so2Body.textContent = so2;
    so2Div.appendChild(so2Head);
    so2Div.appendChild(so2Body);
    list.appendChild(so2Div);
}