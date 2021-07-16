//fetching the data from the api
const covidApi='https://corona.lmao.ninja/v2/countries?yesterday=true&sort';
async function getData(url)
{
    const fetchResults = await fetch(url);
    const jsonFormat= await fetchResults.json();
    return jsonFormat;
}
//displaying tunisian stats
var data=getData(covidApi);
data.then((covidData)=>{
    let output=`<table class="table text-center" style="color:whitesmoke; margin-left:15px;">`
    covidData.forEach(element => {
        if (element.country=="Tunisia")
        {
            output+=`
            <tr>
            <th>
            +${element.todayCases}<br>
            Cases</th>
            <th>
            +${element.todayDeaths} 
            Deaths</th>
            </tr>
            <tr>
            <th>
            +${element.todayRecovered}
            Recovered</th>
            <th>
            ${element.critical} 
            critical</th>
            </tr>
            </table>
            `
        };
        document.getElementById('tunisiaStats').innerHTML=output;
    });
})
//More Details button
document.getElementById('detailsButton').addEventListener(addDetails);
function addDetails()
{
    
}
/*var data=getData(covidApi);
data.then((covidData)=>{
    let output=`<table class="table table-bordered table-hover text-center table-dark table-striped">
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
            <td>${element.country}</td>
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

});*/