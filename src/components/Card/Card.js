import React from 'react'
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './Card.scss'

const CardComponent = ({ title, today, total, active, lastUpdate, ...props }) => (
    <Card onClick={props.handleClick} className={`cardInfo ${props.className}`}>
        <CardContent >
            <Typography variant="h6">
                {title}
            </Typography>
            <Typography variant="h6">
                {total && <CountUp start={0} end={total} duration={2.75} separator="," />}
            </Typography>
            {today &&
                <Typography color="textSecondary" gutterBottom>
                    Today:   {today}
                </Typography>
            }
            <Typography color="textPrimary" variant="body2">Last Updated at : </Typography>
            <Typography color="textSecondary" variant="body2">
                {new Date(lastUpdate).toDateString()} - {new Date(lastUpdate).toLocaleTimeString()}
            </Typography>
        </CardContent>
    </Card>
)


CardComponent.propTypes = {
    title: PropTypes.string,
    today: PropTypes.number,
    total: PropTypes.number,
    active: PropTypes.bool,
    lastUpdate: PropTypes.number,
    handleClick: PropTypes.func
};

export default CardComponent
