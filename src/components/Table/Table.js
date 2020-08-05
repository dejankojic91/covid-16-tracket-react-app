import React from 'react'
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import Avatar from '@material-ui/core/Avatar';

import './Table.scss'

const Table = ({ tableCountriesData }) => (
  <table className="table">
    <tbody>
      {tableCountriesData.map(({ country, cases, countryInfo }) => (
        <tr key={country}>
          <td><Avatar alt={country} src={countryInfo.flag} /></td>
          <td>{country}</td>
          <td>
            <strong>{cases && <CountUp start={0} end={cases} duration={2.75} separator="," />}</strong>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

Table.propTypes = {
  tableCountriesData: PropTypes.array
};

export default Table
