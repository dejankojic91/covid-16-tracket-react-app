import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './Navbar.scss'

const Navbar = () => (
    <AppBar className="navbar" position="static">
        <Toolbar>
            <Typography variant="h6">
                COVID TRACKER
            </Typography>
        </Toolbar>
    </AppBar>
)

export default Navbar;
