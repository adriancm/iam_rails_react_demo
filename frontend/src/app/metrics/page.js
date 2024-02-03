'use client'
import SymmetricTimeline from "@src/app/components/SymmetricTimeline";
import { Grid, Button, ButtonGroup } from '@mui/material';
import {useEffect, useState} from "react";
import {getAverageMetrics} from "@src/app/metrics/actions";
import { PER_MINUTE, TIME_PERIODS } from "@src/app/constants";

const MetricsPage = (props) => {

    const [metrics, setMetrics] = useState([]);
    const [timePeriod, setTimePeriod] = useState(PER_MINUTE);

    const getMetrics = async () => {
        getAverageMetrics({ timePeriod }).then((res)=> { console.log(res); setMetrics(res) });
    }

    const getTimestamp = (item) => {
        const date = new Date(item.time_period);
        return date.toLocaleString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
    }

    useEffect(() => {
        getMetrics();
    }, [timePeriod]);

    return (
        <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ margin: 5 }}
        >
            <Grid item xs={12} sm={6}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    {TIME_PERIODS.map(period => 
                        <Button key={period} disabled={timePeriod === period} onClick={_=> setTimePeriod(period)}>{period}</Button>
                    )}
                </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <SymmetricTimeline
                    content={item => item.avg}
                    oppositeContent={getTimestamp}
                    items={metrics}
                />
            </Grid>
        </Grid>
    );
}

export default MetricsPage;
