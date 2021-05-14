import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';



//read all stories ids
//pass them to question screen
// question
const Home = props => {
    const [isFirstQuestion, setIsFirstQuestion] = useState(true); 
    const [questionIdsArr, setQuestionIdsArr] = useState([]); 
    const [currStoryIndex, setCurrStoryIndex] = useState(0); 


    useEffect(() => {
        get_stories_ids();
        console.log(props);
      }, []);

      useEffect(() => {
          console.log("====");
        console.log(props.location.state);
      }, [props.location.state]);

      const extractIds = (jsonArr) => {
          let idsArr = [];
          for (let i =0, n=jsonArr.length; i < n; i++){
              const currId = jsonArr[i].id
              idsArr.push(currId);
          }
          return idsArr
      }

      const get_stories_ids = () =>{
        axios.get(`http://localhost:8000/api/stories/`)
        .then((response) => {
            const ids = extractIds(response.data);
            setQuestionIdsArr(ids);
      }
        ).catch((error) => {
          console.log(error.name + " " + error.response.status + ": " + error.response.data.detail);
          })
      }



      const renderSuccessMessage= () => {
          if (!isFirstQuestion) {
            return (
                <h1>Good Job! Want to try another question?</h1>
            )           
          }
      }


      const continueToNextQuestion = () => {

      }

    return(
        <div>
            <h1>Vocabulary Learning Tool</h1>
            {renderSuccessMessage()}
            <Button
                    // onClick = {() => props.history.push('http://localhost:8000/api/stories/1/story_question/')}
                    onClick = {() =>props.history.push(`/questions/${questionIdsArr[currStoryIndex]}`) }
                    color="primary" 
                    size="large">
                    Click here to start
                </Button>
        </div>

    )
}

export default Home;