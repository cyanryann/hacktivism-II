
results = document.getElementById("results");
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
        const data = proxyResponse.data;
        results.innerText = "Your closest city is " + data.result.city;
        } catch (error)
    {
        console.error('Error fetching data: ', error);
        return null;  
    }
}
