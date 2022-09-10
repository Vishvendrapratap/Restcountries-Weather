const countriesElem= document.querySelector(".row")

async function getCountry(){
    const url= await fetch("https://restcountries.com/v2/all");
    const res = await url.json();
    // console.log(res);
    res.forEach((elem)=>{
        showCountry(elem)
    })
}


function showCountry(data){
    const div = document.createElement("div")
    div.className="col-lg-4"
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
        <div class="card-header">
        ${data.name}
        </div>
        <div class="country-img">
            <img src="${data.flag}" class="card-img-top" alt="">
        </div>
        <div class="card-body" id="country-info">
          <p><strong>Capital: </strong> ${data.capital} </p>
          <p><strong>Region: </strong>${data.region}</p>
          <p><strong>Country Code: </strong>${data.alpha3Code} </p>
          <button id="weather" onClick="getWeather()" class="btn btn-primary">Click for Weather</button>
          <div id="divtext" class="card-text"></div>
        </div>
    </div>
      `
    async function getWeather() {
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital}&appid=be575a49fe80911f8e8b8104518729a6`)
        const res = await  weatherData.json()
        console.log(res);

        const weather=document.getElementById('weather')
        weather.addEventListener('click',()=>{
                
            var divtext = document.getElementById('divtext')
                   divtext.innerHTML=`<p class="card-text">Humidity:${res.main.humidity}</p>
                                   <p class="card-text">Temperature:${res.main.temp}</p>
                                   <p class="card-text">Pressure:${res.main.pressure}</p>
                                   <p class="card-text">Visibility:${res.visibility}</p>                                                                
                                   <button class="btn btn-primary" onclick="divtext.style.display='none'">Close</button>`           
                  divtext.style.display="block"      
        });
    }
    countriesElem.appendChild(div)
    getWeather()
}

getCountry(); 