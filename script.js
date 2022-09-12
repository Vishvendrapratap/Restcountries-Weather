const countriesElem= document.querySelector(".row")

//Function to get all restcounties
async function getCountry(){
    const url= await fetch("https://restcountries.com/v2/all"); //fetching api
    const res = await url.json();
    // console.log(res);
    res.forEach((elem,index)=>{
        showCountry(elem,index)
    })
}


//function to sgow coutris in card
function showCountry(data,ind){
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
          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${ind}" aria-expanded="false" aria-controls="collapseExample" onclick="weatherData()">
                Click for Weather
           </button>
            <div class="collapse" id="collapseExample${ind}">
                This is the text where weather data is to be displayed.
                    <div class="info">
                 </div>
              </div>
        </div>
    </div>
      `
    //   Function to get weather
    async function getWeather() {
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital}&appid=be575a49fe80911f8e8b8104518729a6`)
        const res = await  weatherData.json()
        // console.log(res);

        localStorage['jsonData'] = JSON.stringify(res);
        const getClass = document.querySelector(`#collapseExample${ind}`);
        
        getClass.innerHTML  =`<p class="card-text">Humidity:${res.main.humidity}</p>
                                   <p class="card-text">Temperature:${res.main.temp}</p>
                                   <p class="card-text">Pressure:${res.main.pressure}</p>
                                   <p class="card-text">Visibility:${res.visibility}</p>                                                                
                                  `           
                            }
                    countriesElem.appendChild(div)
    getWeather() //calling function to get weather
}
getCountry(); 
