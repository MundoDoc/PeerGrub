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
                            <Paper sx={{borderRadius: "10px", height: 200, width: "100%", backgroundColor: '#fff2e3', border: "1px solid #ddd", boxShadow: "rgba(0, 0, 0, 0.1) 5px 10px 20px;"}}>
                                <h1 className='paperStyle'>Only At</h1>
                                <p>California State University, Dominguez Hills</p>
                                <p>1000 E. Victoria Street</p>
                                <p>Carson, CA 90747</p>
                                <p>310-243-3696</p>
                            </Paper>
                        </Grid>
                        <Grid className="eachBox" item>
                            <Paper sx={{borderRadius: "10px", height: 200, width: "100%", backgroundColor: '#fff2e3', border: "1px solid #ddd", boxShadow: "rgba(0, 0, 0, 0.1) 5px 10px 20px;"}}>
                                <h1 className='paperStyle'>About Us</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </Paper>
                        </Grid>
                        <Grid className="eachBox" item>
                            <Paper sx={{borderRadius: "10px", height: 200, width: "100%", backgroundColor: '#fff2e3', border: "1px solid #ddd", boxShadow: "rgba(0, 0, 0, 0.1) 5px 10px 20px;"}}>
                                <h1 className='paperStyle'>Social Media</h1>
                                <p style={{textDecoration: "underline"}}>Facebook</p>
                                <p style={{textDecoration: "underline"}}>X (formally Twitter)</p>
                                <p style={{textDecoration: "underline"}}>Instagram</p>
                                <p style={{textDecoration: "underline"}}>LinkedIn</p>

                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )

}