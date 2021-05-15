import Typography from '@material-ui/core/Typography';

const Footer = (props) => {
    return (
        <footer>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            You finished {props.stories} stories!
            </Typography>
      </footer>
    )
}


export default Footer;