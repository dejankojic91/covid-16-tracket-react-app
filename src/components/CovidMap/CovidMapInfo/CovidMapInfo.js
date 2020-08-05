import React from 'react'
import PropTypes from 'prop-types';
import { Circle, Popup } from "react-leaflet";
import CountUp from 'react-countup';
import Avatar from '@material-ui/core/Avatar';

import { casesColors } from '../../../utils/util';
import './CovidMapInfo.scss';

const CovidMapInfo = ({ country, caseType }) => (
    <Circle
        key={country.countryInfo.country}
        fillColor={casesColors[caseType].hex}
        fillOpacity={0.4}
        radius={Math.sqrt(country[caseType]) * casesColors[caseType].multiplier}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesColors[caseType].hex}>
        <Popup>
            <div className="covidMapInfo">
                <div className="covidMapInfo__name"> <Avatar alt={country.country} src={country.countryInfo.flag} />{country.country}</div>
                <div className="covidMapInfo__confirmed">
                    Cases: {country.cases && <CountUp start={0} end={country.cases} duration={2.75} separator="," />}
                </div>
                <div className="covidMapInfo__recovered">
                    Recovered: {country.recovered && <CountUp start={0} end={country.recovered} duration={2.75} separator="," />}
                </div>
                <div className="covidMapInfo__deaths">
                    Deaths: {country.deaths && <CountUp start={0} end={country.deaths} duration={2.75} separator="," />}
                </div>
            </div>
        </Popup>
    </Circle>
)

CovidMapInfo.propTypes = {
    country: PropTypes.object,
    caseType: PropTypes.string
};

export default CovidMapInfo
