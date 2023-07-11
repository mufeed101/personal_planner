import { Typography, Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; 
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const useStyles = makeStyles((theme) => ({
    weekSelector: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
        alignItems: 'center',
        '& > *': {
          margin: theme.spacing(0, 1),
        },
      },
      greyOutline: {
        outline: `2px solid '#EEEEEE'`
      },
}))

function WeekSelector({ startOfWeek, setStartOfWeek }) {
    const classes = useStyles();
    const goNextWeek = () => {
        setStartOfWeek(startOfWeek.clone().add(1, 'week'));
      };
    const goPrevWeek = () => {
        setStartOfWeek(startOfWeek.clone().subtract(1, 'week'));
      };

    return (
        <Box className={classes.weekSelector}>
            <IconButton color="primary" onClick={goPrevWeek} className={classes.greyOutline}>
                <NavigateBeforeIcon/>
            </IconButton>
            <Typography variant="h6">
                {`${startOfWeek.format('MMMM D')} - ${startOfWeek.clone().add(6, 'days').format('MMMM D')}`}
            </Typography>
            <IconButton color="primary" onClick={goNextWeek} className={classes.greyOutline}>
                <NavigateNextIcon/>
            </IconButton>
        </Box>
    );
  }

export default WeekSelector;