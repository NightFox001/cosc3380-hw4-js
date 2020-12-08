import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const FlightSchedulerItem = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid item xs={6} sm={6}>
            <Paper className={classes.paper}>
                {children}
            </Paper>
        </Grid>
    )
}