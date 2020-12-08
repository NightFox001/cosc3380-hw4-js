import Grid from '@material-ui/core/Grid';

export const FlightSchedulerItem = ({ children }) => {
  return (
    <Grid item xs={4}>
      {children}
    </Grid>
  )
}