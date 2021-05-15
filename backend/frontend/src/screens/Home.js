import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import QuestionScreen from "./QuestionScreen";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '@material-ui/core/Container';

const Home = props => {
    const [questionIdsArr, setQuestionIdsArr] = useState([]); 
    const [currStoryIndex, setCurrStoryIndex] = useState(0); 
    const [showMainScreen, setShowMainScreen] = useState(true);  //is first question
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      //get list of all the available stories ids
      const get_stories_ids = () =>{
        if (questionIdsArr.length) return;
        axios.get(`http://127.0.0.1:8000/api/stories/`)
        .then((response) => {
            setQuestionIdsArr(response.data);
            setIsLoading(false);
      }
        ).catch((error) => {
          console.log(error);
          })
      }

        get_stories_ids();
      }, [questionIdsArr]);


      //continuing to the next question means moving the index of our stories id array
      const continueToNextQuestion = () => {
        setShowMainScreen(true);
        setCurrStoryIndex(currStoryIndex + 1);
      }


      const renderMessage= () => {
        if (!isLoading && questionIdsArr.length === 0) return (<h1>No stories were found</h1>);
        if (currStoryIndex === 0) return (<h1>Welcome! Want to start learning?</h1>);  
        if (currStoryIndex >= questionIdsArr.length) return (<h1>You played all the stories! Want to start over?</h1>);
        if (currStoryIndex) return (<h1>Good Job! Want to try another story?</h1>);
      }


      const onStartClick = () => {
        setShowMainScreen(false);
        if (currStoryIndex >= questionIdsArr.length) {
            setCurrStoryIndex(0);
        }
      }


      const getButtonText = () =>{
        if (currStoryIndex === 0) return "Start Playing";
        if (currStoryIndex >= questionIdsArr.length) return "Start from the beginning";
        if (currStoryIndex) return "Continue to next story";
      }


      const renderMain = () => {
          if (showMainScreen){
            return (
                <Container component="main" maxWidth="xl" fixed 
                            style={{display: "flex", flexDirection: 'column',
                                    justifyContent: "center", alignItems: "center"}}>
                    {renderMessage()}
                    <Button
                        onClick = {() => onStartClick()}
                        color="primary" 
                        variant="outlined"
                        disabled = {isLoading}
                        size="large">
                        {getButtonText()}
                    </Button>
                </Container>
            )
          }

          return (
            <Container component="main" maxWidth="xl" fixed>
                 <QuestionScreen storyId = {questionIdsArr[currStoryIndex]}
                 continueToNextQuestion={continueToNextQuestion} />
            </Container>
          )
      }

    return(
        <React.Fragment>
            <Header title="Vocabulary Learning App" />
            {renderMain()}
            <Footer stories = {currStoryIndex} />
        </React.Fragment>

    )
}

export default Home;