import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Footer = (props) => {

    //only show number of completed stories if greater than 0
    const get_stories_completed_text = () =>{
        if (props.stories)
            return `You finished ${props.stories} stories!`
    }

    return (
        <footer style={{marginTop: "50px"}}>
            <Container>
            <Typography variant="subtitle1" align="center" color="textPrimary" component="p">
                {get_stories_completed_text()}
            </Typography>
        </Container>
        </footer>
    )
}


export default Footer;