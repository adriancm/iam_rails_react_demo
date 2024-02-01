import SymmetricTimeline from "@src/app/components/SymmetricTimeline";
import { Grid } from '@mui/material';


const Metrics = () => {
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

export default Metrics;
