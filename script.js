//fetching the data from the api
const covidApi='https://corona.lmao.ninja/v2/countries?yesterday=true&sort';
async function getData(url)
{
    const fetchResults = await fetch(url);
    const jsonFormat= await fetchResults.json();
    return jsonFormat;
}
var output;
var countryTable=[];

let data=getData(covidApi);
//displaying few tunisian stats
showFewDetails('tunisiaStats',data,"tnTable","Tunisia");
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
                countryDiv.remove();
                else
                alertDiv.remove();
            }
        if(found)
        {
            /*countryLink="#"+searchValue;
            document.getElementById('modalButton').setAttribute('href',countryLink);*/
            showFewDetails("modal-container",data,"random-country",searchValue);
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

function showFewDetails(divId,donnees,tableId,country)
{
    donnees.then((covidData)=>{
        output=`<table class="table text-center" id=${tableId} ">`
        covidData.forEach(element => {
            if (element.country.toLowerCase()==country.toLowerCase())
            {
                output+=`
                <tr>
                    <th>
                        +${element.todayCases}<br>
                        Cases
                    </th>
                    <th>
                        +${element.todayDeaths}<br>
                        Deaths
                    </th>
                </tr>
                <tr>
                    <th>
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
let tnStatsTable=document.getElementById('tnTable');
let moreButton=document.getElementById('detailsButton');
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
    document.getElementById('tnTable').remove();
    document.getElementById('tunisiaStats').innerHTML=output;
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
            output+=`
            <tr>
                <th>
                    +${element.todayCases}<br>
                    Cases
                </th>
                <th>
                    +${element.todayDeaths}<br>
                    Deaths
                </th>
                <th>
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
function addDetails()
{
    document.getElementById('tnTable').remove();
    displayElementDetails("Tunisia",data,"tunisiaStats");
    lessDetailsButton();
}

//the world stats table 
data.then((covidData)=>{
    let output=`<table id="wTable" class="table table-bordered table-hover text-center table-dark table-striped">
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
    covidData.forEach(element => {
        output+=`
        <tr>
            <td id="${element.country}">${element.country}<br>
            <img src="https://www.countryflags.io/${element.countryInfo.iso2}/shiny/64.png"></td>
            <td>${element.cases}</td>
            <td>${element.todayCases}</td>
            <td>${element.deaths}</td>
            <td>${element.todayDeaths}</td>
            <td>${element.recovered}</td>
            <td>${element.todayRecovered}</td>
            <td>${element.active}</td>
            <td>${element.critical}</td>
            <td>${element.tests}</td>
            <td>${element.population}</td>
        </tr>
        `
    });
    output+='</table>'
    document.getElementById('tableContainer').innerHTML=output;

});