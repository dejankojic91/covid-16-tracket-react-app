import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import { featchDataForSpecificTime } from '../../utils/api';
import { casesColors } from '../../utils/util';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: (tooltipItem, data) => {
                return tooltipItem.value
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: { parser: 'MM/DD/YY' }
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: true,
                },
                ticks: {
                    callback: (value, index, values) => {
                        return value
                    },
                },
            },
        ],
    },
};

const createDataForChart = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    if (data && data.cases) {
        for (let date in data.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
    }

    return chartData;
};

const Chart = ({ caseType }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getChartData = async () => {
            await featchDataForSpecificTime(120)
                .then((response) => {
                    let data = createDataForChart(response.data, caseType);
                    setChartData(data)
                });
        };
        getChartData();
    }, [caseType])

    return (
        <>
            {chartData?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                fill: true,
                                lineTension: 0.5,
                                borderColor: casesColors[caseType].hex,
                                backgroundColor: casesColors[caseType].half_op,
                                borderWidth: 2,
                                data: chartData,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </>
    )
}

Chart.propTypes = {
    caseType: PropTypes.string,
};

export default Chart
