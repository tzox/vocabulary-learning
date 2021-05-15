import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";


//read all stories ids
//pass them to question screen
// question
const Home = props => {
    const [questionIdsArr, setQuestionIdsArr] = useState([]); 
    const [currStoryIndex, setCurrStoryIndex] = useState(0); 
    const [isFirstQuestion, setIsFirstQuestion] = useState(true);  //is first question
    const [questionsDone, setQuestionsDone] = useState(false);      //did user finish all the questions
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        get_stories_ids();
      }, []);

      useEffect(() => {
        continueToNextQuestion();
        console.log("inside continue to next questions");
      }, [location.state]);



      const continueToNextQuestion = () => {
          console.log("continueToNextQuestion");
          console.log(location.state);
        
          if (location.state && location.state.userAnswered) {
            setCurrStoryIndex(currStoryIndex + 1)
        };

      }



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
        if (currStoryIndex) return (<h1>Good Job! Want to try another question?</h1>);
                       
          
      }


      const onStartClick = () => {
        setIsFirstQuestion(false);
        console.log(questionIdsArr);
        history.push(`/questions/${questionIdsArr[currStoryIndex]}`)
      }

    return(
        <div>
            <h1>Vocabulary Learning Tool</h1>
            {renderMessage()}
            <Button
                    // onClick = {() => props.history.push('http://localhost:8000/api/stories/1/story_question/')}
                    onClick = {() => onStartClick()}
                    color="primary" 
                    size="large">
                    Click here to start
                </Button>
                <br></br>
                You answered {currStoryIndex} Questions
        </div>

    )
}

export default Home;