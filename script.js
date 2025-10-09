
var results = document.getElementById("results");
var list = document.querySelector(".main");
var clean = document.querySelector(".clean")
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
    var isClean = true;
    const aqiDiv = document.createElement("div");
    const aqiHead = document.createElement("h3");
    const aqiBody = document.createElement("p");
    aqiHead.textContent = "Air Quality Index (AQI)";
    if (aqi > 150)
    {
        isClean = false;
        aqiBody.textContent = "Your Air Quality Index is " + aqi + ". An AQI above 150 is considered extremely hazardous, especially for those with lung conditions (such as asthma). Everyone should limit their time outside as much as possible while the air is this polluted.";
    }
    else if (aqi  > 50)
    {
        isClean = false;
        aqiBody.textContent = "Your Air Quality Index is " + aqi + ". An AQI above 50 is considered to be bad for your health. Consider limiting your outside exposure if available.";
    }
    else 
    {
        aqiBody.textContent = "Your Air Quality Index is " + aqi + ". As your AQI is 50 or lower, it is generally considered safe and fine for your health!";
    }
    aqiDiv.appendChild(aqiHead);
    aqiDiv.appendChild(aqiBody);
    list.appendChild(aqiDiv);
    const coDiv = document.createElement("div");
    const coHead = document.createElement("h3");
    const coBody = document.createElement("p");
    coHead.textContent = "Carbon Monoxide (CO)";
    if (co >= 9)
    {
        isClean = false;
        coBody.textContent = "Your Carbon Monoxide levels are at " + co + " ppm. Anything higher than 9ppm is where symptoms such as headaches and dizziness occur. This concentration is likely due to heavy use of vehicles and machinery. Try to reduce your carbon footprint by carpooling and avoiding driving when possible!";
    }
    else
    {
        coBody.textContent = "Your Carbon Monoxide levels are at " + co + " ppm. This is generally considered acceptable, and your local air has no CO problems!";
    }
    coDiv.appendChild(coHead);
    coDiv.appendChild(coBody);
    list.appendChild(coDiv);
    const no2Div = document.createElement("div");
    const no2Head = document.createElement("h3");
    const no2Body = document.createElement("p");
    no2Head.textContent = "Nitrogen Dioxide (NO2)";
    if (no2 > 20)
    {
        isClean = false;
        no2Body.textContent = "Your Nitrogen Dioxide levels are at " + no2 + " ppm. Anything at 20 or above is considered a significant health risk, and can bother your eyes. This kind of pollution is strongly associated with diesel-burning, so try to avoid machines and vehicles depending on diesel if you can!";
    }
    else if (no2 > 5)
    {
        isClean = false;
        no2Body.textContent = "Your Nitrogen Dioxide levels are at " + no2 + " ppm. This is considerely above average, and you may feel some discomfort in your throat or nose. Try to avoid diesel-fueled vehicles if possible to reduce your NO2 footprint!";
    }
    else
    {
        no2Body.textContent = "Your Nitrogen Dioxide levels are at " + no2 + " ppm. This is considered a safe amount of NO2 in the air!";
    }
    no2Div.appendChild(no2Head);
    no2Div.appendChild(no2Body);
    list.appendChild(no2Div);
    const o3Div = document.createElement("div");
    const o3Head = document.createElement("h3");
    const o3Body = document.createElement("p");
    o3Head.textContent = "Ozone (O3)";
    if (o3 > 200)
    {
        isClean = false;
        o3Body.textContent = "Your Ozone levels are at " + o3 + " ppb. These are much higher than what is considered safe, try to avoid spending time outside. If possible, limit your vehicle use and look to invest in renewable energy sources in your area, as these are the primary emitters of O3!";
    }
    else if (o3 > 100)
    {
        isClean = false;
        o3Body.textContent = "Your Ozone levels are at " + o3 + " ppb. This is considered notably above average, and primarily of concern if you are doing something active outside.";
    }
    else
    {
        o3Body.textContent = "Your Ozone levels are at " + o3 + " ppb. This is in the safe range of O3, and this isn't a concern for your area right now!";
    }
    o3Div.appendChild(o3Head);
    o3Div.appendChild(o3Body);
    list.appendChild(o3Div);
    const pm10Div = document.createElement("div");
    const pm10Head = document.createElement("h3");
    const pm10Body = document.createElement("p");
    pm10Head.textContent = "Particulate Matter 10 (PM10)";
    if (pm10 > 55)
    {
        isClean = false;
        pm10Body.textContent = "Your Particulate Matter 10 levels are at " + pm10 + " µg/m3. This is considered much greater than what is safe to breath and is associated with risk of lung damage. If possible, limit your vehicle use and look to invest in renewable energy sources in your area, as these are the primary emitters of aerial particles!";
    }
    else if (pm10 > 35)
    {
        isClean = false;
        pm10Body.textContent = "Your Particulate Matter 10 levels are at " + pm10 + " µg/m3. This is considered slightly above average, and some caution should be held when going outside for extended periods.";
    }
    else
    {
        pm10Body.textContent = "Your Particulate Matter 10 levels are at " + pm10 + " µg/m3. This is considered safe for breathing, and isn't a concern in your area!";
    }
    pm10Div.appendChild(pm10Head);
    pm10Div.appendChild(pm10Body);
    list.appendChild(pm10Div);
    const pm25Div = document.createElement("div");
    const pm25Head = document.createElement("h3");
    const pm25Body = document.createElement("p");
    pm25Head.textContent = "Particulate Matter 2.5 (PM2.5)";
    if (pm25 > 55)
    {
        isClean = false;
        pm25Body.textContent = "Your Particulate Matter 2.5 levels are at " + pm25 + " µg/m3. This is considered much greater than what is safe to breath and is associated with risk of lung damage. If possible, limit your vehicle use and look to invest in renewable energy sources in your area, as these are the primary emitters of aerial particles!";
    }
    else if (pm25 > 35)
    {
        isClean = false;
        pm25Body.textContent = "Your Particulate Matter 2.5 levels are at " + pm25 + " µg/m3. This is considered slightly above average, and some caution should be held when going outside for extended periods.";
    }
    else
    {
        pm25Body.textContent = "Your Particulate Matter 2.5 levels are at " + pm25 + " µg/m3. This is considered safe for breathing, and isn't a concern in your area!"
    }
    pm25Div.appendChild(pm25Head);
    pm25Div.appendChild(pm25Body);
    list.appendChild(pm25Div);
    const so2Div = document.createElement("div");
    const so2Head = document.createElement("h3");
    const so2Body = document.createElement("p");
    so2Head.textContent = "Sulfur Dioxide (SO2)";
    if (so2 > 1)
    {
        isClean = false;
        so2Body.textContent = "Your Sulfur Dioxide levels are at " + so2 + " ppm. This is considered to be unhealthy for breathing, so try to limit your time outside today. Like many other pollutants, SO2 increases correlate with fossil fuel burning, so try to exercise caution with vehicle use!";
    }
    else if (so2  > .5)
    {
        isClean = false;
        so2Body.textContent = "Your Sulfur Dioxide levels are at " + so2 + " ppm. This is considered above average, so people with existing lung conditions should take care when going outside today!"
    }
    else 
    {
        so2Body.textContent = "Your Sulfur Dioxide levels are at " + so2 + " ppm. This is within an expected and healthy range, and so you don't need to worry about SO2 today!"
    }
    so2Div.appendChild(so2Head);
    so2Div.appendChild(so2Body);
    list.appendChild(so2Div);
    if (isClean)
    {
        const cleanDiv = document.createElement("div");
        const cleanHead = document.createElement("h3");
        cleanHead.textContent = "Your area is clean across the board! Congratulations to your community for keeping the environment safe!";
        cleanDiv.appendChild(cleanHead);
        clean.appendChild(cleanDiv);
    }
}