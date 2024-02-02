'use client'
import SymmetricTimeline from "@src/app/components/SymmetricTimeline";
import { Grid } from '@mui/material';
import {useEffect, useState} from "react";

const MetricsPage = (props) => {

    const [metrics, setMetrics] = useState([]);

    useEffect(() => {
        fetch('/api/metrics').then(result => console.log(result));
    });

    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
        >
            <Grid item>
                <SymmetricTimeline />
            </Grid>
        </Grid>
    );
}

export default MetricsPage;
