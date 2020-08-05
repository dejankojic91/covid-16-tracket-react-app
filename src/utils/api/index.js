import axios from 'axios'

const url = 'https://disease.sh/v3/covid-19';

export const featchCountriesData = async () => {
    try {
        return await axios.get(`${url}/countries`);
    } catch (error) {
        return error;
    }
}

export const fetchData = async (country) => {
    const changeableUrl =
        country && (country !== 'global')
            ? `${url}/countries/${country}`
            : `${url}/all`;

    try {
        return await axios.get(changeableUrl);
    } catch (error) {
        return error;
    }
}

export const featchDataForSpecificTime = async (days) => {
    try {
        return await axios.get(`${url}/historical/all?lastdays=${days}`);
    } catch (error) {
        return error;
    }
}