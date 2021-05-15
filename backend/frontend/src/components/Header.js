import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import React from "react";

const Header = (props) => {
    return (
    <React.Fragment>
        <AppBar position="relative" style={{backgroundColor: 'green'}}>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>  
    </React.Fragment>
    )

}

export default Header;