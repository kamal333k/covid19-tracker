import { React } from "react"
import { Card, CardContent, Typography, Grid, StepLabel } from '@material-ui/core';
import CountUp from 'react-countup';
import styles from "./Cards.module.css"
import cx from "classnames";

const Cards = ({data:{confirmed, recovered, deaths, lastUpdate}}) => {
    console.log(confirmed);
    if (!confirmed) {
        return 'Loading...';
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <Typography color="textSecondary" gutterBottom>Infected</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start = {0}
                            end = {confirmed.value}
                            duration = {0.75}
                            separator = ","
                        />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="h5">Active cases from covid-19</Typography>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start = {0}
                            end = {recovered.value}
                            duration = {0.75}
                            separator = ","
                        />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="h5">Recoveries from covid-19</Typography>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                    <Typography variant="h5">
                        <CountUp
                            start = {0}
                            end = {deaths.value}
                            duration = {0.75}
                            separator = ","
                        />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="h5">Demises due to covid-19</Typography>
                </Grid>
            </Grid>

        </div>
    )
}

export default Cards
