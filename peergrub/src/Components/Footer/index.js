import * as React from 'react';
import './index.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Footer() {

    return(
        <div className='footDiv'>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid className="eachBox" item>
                            <Paper sx={{fontFamily: "Monaco", height: 250, width: "100%", backgroundColor: '#e9e0d4',}}>
                                <h1 className='paperStyle'>Info</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </Paper>
                        </Grid>
                        <Grid className="eachBox" item>
                            <Paper sx={{fontFamily: "Monaco", height: 250, width: "100%", backgroundColor: '#e9e0d4',}}>
                                <h1 className='paperStyle'>About Us</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </Paper>
                        </Grid>
                        <Grid className="eachBox" item>
                            <Paper sx={{fontFamily: "Monaco", height: 250, width: "100%", backgroundColor: '#e9e0d4',}}>
                                <h1 className='paperStyle'>Social Media</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )

}