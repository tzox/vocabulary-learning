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
        get_stories_ids();
      }, []);


      const continueToNextQuestion = () => {
        setShowMainScreen(true);
        setCurrStoryIndex(currStoryIndex + 1);

      }

      //extracts just the ids
      //also possible to make a speical api call that will return just the ids (maybe use Paging if database is large)
      const extractIds = (jsonArr) => {
          let idsArr = [];
          for (let i =0, n=jsonArr.length; i < n; i++){
              const currId = jsonArr[i].id
              idsArr.push(currId);
          }
          return idsArr
      }

      const get_stories_ids = () =>{
        if (questionIdsArr.length) return;
        console.log("inside get stories ids");
        axios.get(`http://localhost:8000/api/stories/`)
        .then((response) => {
            const ids = extractIds(response.data);
            setQuestionIdsArr(ids);
            setIsLoading(false);
      }
        ).catch((error) => {
          console.log(error.name + " " + error.response.status + ": " + error.response.data.detail);
          })
      }



      const renderMessage= () => {
        if (!isLoading && questionIdsArr.length == 0) return (<h1>No stories were found</h1>);
        if (currStoryIndex == 0) return (<h1>Welcome! Want to start learning?</h1>);  
        if (currStoryIndex >= questionIdsArr.length) return (<h1>You played all the stories! Want to start over?</h1>);
        if (currStoryIndex) return (<h1>Good Job! Want to try another story?</h1>);
      }


      const onStartClick = () => {
        setShowMainScreen(false);
        if (currStoryIndex >= questionIdsArr.length) {
            setCurrStoryIndex(0);
        }
      }



      const renderMain = () => {
          if (showMainScreen){
            return (
                <Container component="main" maxWidth="l">
                    {renderMessage()}
                    <Button
                        onClick = {() => onStartClick()}
                        color="primary" 
                        variant="outlined"
                        size="large">
                        Click here to start
                    </Button>
                </Container>
            )
          }

          return (
            <Container component="main" maxWidth="l">
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