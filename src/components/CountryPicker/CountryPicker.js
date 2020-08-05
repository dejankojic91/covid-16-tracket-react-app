import React from 'react'
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const CountryPicker = ({ country, countries, handleCountryChange }) => (
    <FormControl>
        <Select
            variant="outlined"
            value={country}
            onChange={handleCountryChange}
        >
            <MenuItem value="global">Global</MenuItem>
            {countries.map((country) => (
                <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
            ))}
        </Select>
    </FormControl>
)

CountryPicker.propTypes = {
    countries: PropTypes.array,
    handleCountryChange: PropTypes.func,
};

export default CountryPicker
