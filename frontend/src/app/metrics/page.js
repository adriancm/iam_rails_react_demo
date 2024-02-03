'use client'
import SymmetricTimeline from "@src/app/components/SymmetricTimeline";
import { Grid, Button, ButtonGroup, CircularProgress } from '@mui/material';
import {useEffect, useRef, useState} from "react";
import {getAverageMetrics} from "@src/app/metrics/actions";
import {PER_DAY, PER_MINUTE, TIME_PERIODS} from "@src/app/constants";
import InfiniteScroll from 'react-infinite-scroller';

const MetricsPage = (props) => {

    const [metrics, setMetrics] = useState([]);
    const [timePeriod, setTimePeriod] = useState(PER_MINUTE);
    const page = useRef(1);
    const [hasMore, setHasMore] = useState(true);

    const getMetrics = async (nextPage) => {
        getAverageMetrics({ timePeriod, page: nextPage })
            .then(
                items => {
                    if (items.length > 0) {
                        setMetrics(
                            prevItems => nextPage > 1 ? [...prevItems, ...items] : items
                        )
                    } else {
                        setHasMore(false);
                    }
                }
            );
    }

    const getTimestamp = (item) => {
        const date = new Date(item.period_timestamp);
        return date.toLocaleString('es-ES', {
            ...(timePeriod !== PER_DAY && {hour: '2-digit', minute: '2-digit'}),
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
    }

    useEffect(() => {
        page.current = 1;
        setHasMore(true);
        getMetrics(page.current);
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
                <InfiniteScroll
                    pageStart={1}
                    loadMore={() => { page.current = page.current + 1; getMetrics(page.current) }}
                    hasMore={hasMore}
                    loader={<CircularProgress color="secondary" />}
                >
                    <SymmetricTimeline
                        content={item => item.avg}
                        oppositeContent={getTimestamp}
                        items={metrics}
                    />
                </InfiniteScroll>

            </Grid>
        </Grid>
    );
}

export default MetricsPage;
