import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Footer = (props) => {

    const get_stories_completed_text = () =>{
        if (props.stories)
        return (<p>You finished {props.stories} stories!</p>)
    }

    return (
        <footer style={{marginTop: 'auto'}}>
            <Container maxWidth="sm">
            <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
            {get_stories_completed_text()}
            </Typography>
        </Container>
        </footer>
    )
}


export default Footer;