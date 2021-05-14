import Button from '@material-ui/core/Button';


const Home = props => {
    return(
        <div>
            <h1>Vocabulary Learning Tool</h1>
            <Button
                // onClick = {() => props.history.push('http://localhost:8000/api/stories/1/story_question/')}
                onClick = {() =>props.history.push('/questions/1') } //SHOULD REPLACE TO THIS WHEN PROXY IS FIXED
                
                color="primary" 
                size="large">
                Click here to start
            </Button>
        </div>

    )
}

export default Home;