//fetching the data from the api
const covidApi='https://corona.lmao.ninja/v2/countries?yesterday=true&sort';
const worldCovidApi='https://disease.sh/v3/covid-19/all';
const continentApi='https://corona.lmao.ninja/v2/continents?yesterday=true&sort';
async function getData(url)
{
    const fetchResults = await fetch(url);
    const jsonFormat= await fetchResults.json();
    return jsonFormat;
}
var output;
var countryTable=[];

let data=getData(covidApi);
let worldData=getData(worldCovidApi);
let continentData=getData(continentApi);


    worldData.then((element)=>{
        output=`<table class="table text-center" id='worldCard' ">`
            
                let textColors=assignTextColors(element.todayCases,element.todayDeaths,element.todayRecovered);
                output+=`
                <tr>
                    <th style=${textColors["casesTextColor"]}>
                        +${element.todayCases}<br>
                        Cases
                    </th>
                    <th style=${textColors["deathsTextColor"]}>
                        +${element.todayDeaths}<br>
                        Deaths
                    </th>
                </tr>
                <tr>
                    <th style=${textColors["recoveredTextColor"]}>
                        +${element.todayRecovered}<br>
                        Recovered
                    </th>
                    <th>
                        ${element.critical}<br>
                        critical
                    </th>
                </tr>
                </table>
                `
            document.getElementById('worldStats').innerHTML=output;
    })

function displayMoreWorldData()
{
    worldData.then((element)=>{
        let output=`<table class="table text-center" id="worldCard" style="color:whitesmoke;">`
        
            
                let textColors=assignTextColors(element.todayCases,element.todayDeaths,element.todayRecovered);
    
                output+=`
                <tr>
                    <th style=${textColors["casesTextColor"]}>
                        +${element.todayCases}<br>
                        Cases
                    </th>
                    <th style=${textColors["deathsTextColor"]}>
                        +${element.todayDeaths}<br>
                        Deaths
                    </th>
                    <th style=${textColors["recoveredTextColor"]}>
                        +${element.todayRecovered}<br>
                        Recovered
                        
                    </th>
                </tr>
                <tr>
                    <th>
                        ${element.cases}<br>
                        Total Cases
                    </th>
                    <th>
                        ${element.deaths}<br>
                        Total Deaths
                    </th>
                    <th>
                        ${element.recovered}<br>
                        Total Recovered
                    </th>
                </tr>
                <tr>
                    <th>
                        ${element.active}<br>
                        Active Cases
                    </th>
                    <th>
                        ${element.tests}<br>
                        Tested
                    </th>
                    <th>
                        ${element.critical}<br>
                        critical
                    </th>
                </tr>
                </table>
                `
            document.getElementById('worldStats').innerHTML=output;
    })
}
//displayWorldData();
//search Modal
let searchClicked=false;
document.getElementById('searchForm').addEventListener('submit',searchCountry);
function searchCountry(e)
{
    e.preventDefault();
    data.then((covidData)=>{
        covidData.forEach(
            element=>{
                countryTable.push(element.country);
            }
        )
        let searchValue=document.getElementById('searchInput').value;
            
        let found=countryTable.find((countryName)=>{
            return countryName.toLowerCase()===searchValue.toLowerCase();
        })
        
        if(searchClicked)
            {
                let alertDiv=document.getElementById("alert");
                let countryDiv=document.getElementById("random-country");
                if(countryDiv!=null)
                {countryDiv.remove();
                document.getElementById('textModal').remove();
            }
                else
                alertDiv.remove();
            }
        if(found)
        {
            let p=document.createElement('p');
            p.innerHTML='For more details check the table below';
            p.style.color="black";
            p.style.fontWeight="bold";
            p.setAttribute('id','textModal');
            showFewDetails("modal-container",data,"random-country",searchValue);
            document.getElementById("pContainer").appendChild(p);
        }
        else
        {
            let alertText=document.createElement('p');
            alertText.setAttribute('id','alert');
            alertText.innerHTML="COUNTRY NOT FOUND !";
            alertText.style.color='#FF0000';
            document.getElementById('modal-container').appendChild(alertText);
        }
        searchClicked=true;
    })
}



//colors assignment
function assignTextColors(tCases,tDeaths,tRecovered)
{
    let textColors={"casesTextColor":"color:","deathsTextColor":"color:","recoveredTextColor":"color:"};
    if(tCases>0)
    textColors["casesTextColor"]+="red";
    else
    textColors["casesTextColor"]+="green";

    if(tDeaths>0)
    textColors["deathsTextColor"]+="red";
    else
    textColors["deathsTextColor"]+="green";

    if(tRecovered>0)
    textColors["recoveredTextColor"]+="green";

    return textColors
}

function showFewDetails(divId,donnees,tableId,country)
{
    donnees.then((covidData)=>{
        output=`<table class="table text-center" id=${tableId} ">`
        covidData.forEach(element => {
            if (element.country.toLowerCase()==country.toLowerCase())
            {
                let textColors=assignTextColors(element.todayCases,element.todayDeaths,element.todayRecovered);
                output+=`
                <tr>
                    <th style=${textColors["casesTextColor"]}>
                        +${element.todayCases}<br>
                        Cases
                    </th>
                    <th style=${textColors["deathsTextColor"]}>
                        +${element.todayDeaths}<br>
                        Deaths
                    </th>
                </tr>
                <tr>
                    <th style=${textColors["recoveredTextColor"]}>
                        +${element.todayRecovered}<br>
                        Recovered
                    </th>
                    <th>
                        ${element.critical}<br>
                        critical
                    </th>
                </tr>
                </table>
                `
            };
            document.getElementById(divId).innerHTML=output;
        });
    })
}

//More Details button
document.getElementById('detailsButton').addEventListener('click',addDetails);
let worldStatsTable=document.getElementById('worldCard');
let moreButton=document.getElementById('detailsButton');
function addDetails()
{
    document.getElementById('worldCard').remove();
    displayMoreWorldData();
    lessDetailsButton();
}
function lessDetailsButton()
{
    document.getElementById('detailsButton').remove();
    let lessButton=document.createElement('button');
    lessButton.setAttribute('id','lessDetails');
    lessButton.innerHTML='Less Details';
    lessButton.classList.add('btn');
    lessButton.classList.add('btn-light');
    document.getElementById('divButton').appendChild(lessButton);
    lessButton.addEventListener('click',showLess);
}
function showLess()
{
    document.getElementById('worldCard').remove();
    document.getElementById('worldStats').innerHTML=output;
    document.getElementById('lessDetails').remove();
    document.getElementById('divButton').appendChild(moreButton);
}
function displayElementDetails(country,donnees,divId)
{
    donnees.then((covidData)=>{
    let output=`<table class="table text-center" id="tnTable" style="color:whitesmoke;">`
    covidData.forEach(element => {
        if (element.country==country)
        {
            let textColors=assignTextColors(element.todayCases,element.todayDeaths,element.todayRecovered);

            output+=`
            <tr>
                <th style=${textColors["casesTextColor"]}>
                    +${element.todayCases}<br>
                    Cases
                </th>
                <th style=${textColors["deathsTextColor"]}>
                    +${element.todayDeaths}<br>
                    Deaths
                </th>
                <th style=${textColors["recoveredTextColor"]}>
                    +${element.todayRecovered}<br>
                    Recovered
                    
                </th>
            </tr>
            <tr>
                <th>
                    ${element.cases}<br>
                    Total Cases
                </th>
                <th>
                    ${element.deaths}<br>
                    Total Deaths
                </th>
                <th>
                    ${element.recovered}<br>
                    Total Recovered
                </th>
            </tr>
            <tr>
                <th>
                    ${element.active}<br>
                    Active Cases
                </th>
                <th>
                    ${element.tests}<br>
                    Tested
                </th>
                <th>
                    ${element.critical}<br>
                    critical
                </th>
            </tr>
            </table>
            `
        };
        document.getElementById(divId).innerHTML=output;
    });
})
}


data.then(
    (covidData)=>{
        let output=`<table id="wTable" class="table table-bordered  text-center table-dark table-striped">
        <tr>
        <th>countries</th>
        <th>Cases</th>
        <th>Today Cases</th>
        <th>Deaths</th>
        <th>Today Deaths</th>
        <th>Recovered</th>
        <th>Today Recovered</th>
        <th>Active</th>
        <th>Critical</th>
        <th>Tested</th>
        <th>Population</th>
        </tr>
                `
        covidData.sort((element1,element2)=>{
        return element2.cases-element1.cases;
        })
        covidData.forEach((element)=>
        {
            let textColors=assignTextColors(element.todayCases,element.todayDeaths,element.todayRecovered);
            output+=`
            <tr>
                <td id="${element.country}">${element.country}<br>
                <img src="https://www.countryflags.io/${element.countryInfo.iso2}/shiny/64.png"></td>
                <td>${element.cases}</td>
                <td style=${textColors["casesTextColor"]}>${element.todayCases}</td>
                <td>${element.deaths}</td>
                <td style=${textColors["deathsTextColor"]}>${element.todayDeaths}</td>
                <td>${element.recovered}</td>
                <td style=${textColors["recoveredTextColor"]}>${element.todayRecovered}</td>
                <td>${element.active}</td>
                <td>${element.critical}</td>
                <td>${element.tests}</td>
                <td>${element.population}</td>
            </tr>
            `
        })
        output+='</table>';
        document.getElementById('tableContainer').innerHTML=output;
    }
)
let continentsTable=[['Continent',' Deaths','Recovered','Population']];
continentData.then((covidData)=>{
    covidData.forEach((element)=>{
        continentsTable.push([element.continent,element.deaths,element.recovered,element.population]);
    })
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {

            var data = google.visualization.arrayToDataTable(continentsTable);
      
            var options = {
              title: 
               `X=Deaths 
               Y=Recovered 
               Bubble size=Population 
               Bubble color=Population`,
               chartArea: {
                backgroundColor: {
                  fill: '#837F7F',
                  fillOpacity: 0.1
                },
              },
              
              backgroundColor: {
                fill: '#212529',
                fillOpacity: 0.8
              },
              
              colorAxis: {colors: ['#50C878', '#228B22', '#023020']},
              hAxis: {title: 'Deaths Rate'},
              vAxis: {title: 'Recovering rate'},
              bubble: {
                textStyle: {
                  auraColor: 'none',
                }
              }
            };
      
            var chart = new google.visualization.BubbleChart(document.getElementById('continents'));
      
            chart.draw(data, options);
          }
    
})


    