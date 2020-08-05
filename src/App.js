import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { Navbar, CountryPicker, Card, Table, Chart, CovidMap } from './components';
import { featchCountriesData, fetchData } from './utils/api';
import { dataSort } from "./utils/util";

import './App.scss';

function App() {
  const [country, setSelectedCountry] = useState("global");
  const [countryInfoData, setCountryInfoData] = useState({});
  const [countries, setCountreiesData] = useState([]);
  const [caseType, setCaseType] = useState("cases");
  const [tableCountryData, setTableCountryData] = useState([]);
  const [covidMapCountries, setCovidMapCountriesData] = useState([]);
  const [covidMapLatLng, setCovidMapLatLng] = useState([48.210033, 16.363449]);

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchData()
        .then(({ data }) => {
          setCountryInfoData(data);
        })
    };

    fetchAllData();
  }, [])


  useEffect(() => {
    const getCountriesData = async () => {
      await featchCountriesData()
        .then(({ data }) => {
          const sortedData = dataSort(data);
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCovidMapCountriesData(data);
          setCountreiesData(countries);
          setTableCountryData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const handleCountryChange = async (event) => {
    const country = event.target.value
    await fetchData(country)
      .then(({ data }) => {
        setSelectedCountry(country);
        setCountryInfoData(data);
        setCovidMapLatLng([data.countryInfo.lat, data.countryInfo.long]);
      });
  }

  return (
    <div className="covidApp">
      <Navbar />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={9} md={10}>
          <CovidMap
            countries={covidMapCountries}
            caseType={caseType}
            mapLatLng={covidMapLatLng}
            zoom={3}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <div className="covidApp__countryPicker">
            <CountryPicker country={country} countries={countries} handleCountryChange={handleCountryChange} />
          </div>
          <div className="covidApp__cardContainer">
            <Card
              className="cases"
              title="Cases"
              case={countryInfoData.todayCases}
              total={countryInfoData.cases}
              lastUpdate={countryInfoData.updated}
              active={caseType === "cases"}
              isRed
              handleClick={() => setCaseType("cases")}
            />

            <Card
              className="recovered"
              title="Recovered"
              today={countryInfoData.todayRecovered}
              total={countryInfoData.recovered}
              lastUpdate={countryInfoData.updated}
              active={caseType === "recovered"}
              handleClick={() => setCaseType("recovered")}
            />

            <Card
              className="deaths"
              title="Deaths"
              today={countryInfoData.todayDeaths}
              total={countryInfoData.deaths}
              lastUpdate={countryInfoData.updated}
              active={caseType === "deaths"}
              handleClick={() => setCaseType("deaths")}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <div className="covidApp__chart">
            <h4>Global new {caseType}</h4>
            <Chart caseType={caseType} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <div className="covidApp__countryTable">
            <h4>Confirmed Casses by Country</h4>
            <Table tableCountriesData={tableCountryData} />
          </div>
        </Grid>
      </Grid>
    </div >
  );
}

export default App;
