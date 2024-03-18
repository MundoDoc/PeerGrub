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
                    <h5>Step right up, get your fresh and hot homemade empanadas here! Who's hungry for some delicious, freshly-baked cookies?</h5>
                </Grid>
            </Grid>
        </div>
    );

}