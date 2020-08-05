import React from 'react'
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import { CovidMapMarkers } from '../../components/';
import './CovidMap.scss';

const CovidMap = ({ countries, caseType, mapLatLng, zoom }) => (
    <div className="covidMap">
        <LeafletMap center={mapLatLng} zoom={zoom} minZoom="1.5" maxZoom="5">
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
            />
            {countries.map((country) => (
                <CovidMapMarkers key={country.country} country={country} caseType={caseType} />
            ))}
        </LeafletMap>
    </div>
)

CovidMap.propTypes = {
    countries: PropTypes.array,
    caseType: PropTypes.string,
    mapLatLng: PropTypes.array,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number
};

export default CovidMap
