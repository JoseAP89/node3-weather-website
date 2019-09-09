const weatherForm = document.querySelector("Form");
const search = document.querySelector("input");
let lat = document.querySelector("#latitude");
let lon = document.querySelector("#longitude");
let loc = document.querySelector("#location");
let prob = document.querySelector("#probRain");
let info = document.querySelector("#summary");
let temp = document.querySelector("#temperature");
let err_msg = document.querySelector("#err");

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("Testing");
    let location = search.value;
    let url = "/weather?address=" +location;
    fetch(url).then( (resp)=>{
        resp.json().then((dataFetched)=>{
            if(dataFetched.err ){
                err_msg.textContent = `Invalid location Error: ${dataFetched.err}` ;
            }else if(dataFetched.data==undefined){
                err_msg.textContent = "Error: You must provide a location" ;
            } else {
                err_msg.textContent = "";
                lat.textContent = `Latitude: ${dataFetched.data.latitude}°` ;
                lon.textContent = `Longitude: ${dataFetched.data.longitude}°` ; 
                loc.textContent = `Location: ${dataFetched.data.location}` ; 
                prob.textContent = `Probability of Rain: ${Number(dataFetched.dataF.probRain)*100}%` ;
                info.textContent = `Summary: ${dataFetched.dataF.summary}` ;
                temp.textContent = `Temperature: ${dataFetched.dataF.temperature}°C` ;
            }
        });
    });
})