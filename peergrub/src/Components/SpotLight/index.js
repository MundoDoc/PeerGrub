import React from'react';
import './index.css';
import Grid from '@mui/material/Grid';
import FillerImage from '../../Assets/StockSeller.png';

export default function SpotLight() {

    return(
        <div className='spotlightDiv'>
            <Grid container spacing={2}>
                <Grid className="picGrid" item xs={4}>
                    <img className="spotStyle" src={FillerImage} alt="Left Slide" style={{ width: '100%' }} />
                </Grid>
                <Grid className='gridStyle' item xs={8}>
                    <h3 className='articleTitle'> <a className="spotLink" href="/listings">Recipies from the CSUDH Cultural Food Festival</a></h3>
                    <h5 className='articleDate'>May 7th, 2024</h5>
                    <h4 className='articleContent'>California State University, Dominguez Hills (CSUDH) is gearing up to host a vibrant Cultural Food Festival, 
                    celebrating the rich diversity of its student population. Set to be a feast for the senses, the event promises to showcase a myriad of culinary 
                    delights representing various cultures and backgrounds. While the festival itself will undoubtedly be a highlight, we're here to tantalize your 
                    taste buds with <b><a className="spotLink" href="/listings">exquisite recipes</a></b> inspired by the vibrant tapestry of CSUDH.</h4>
                </Grid>
            </Grid>
        </div>
    );

}