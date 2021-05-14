import React, { useState, useEffect } from "react";
import QuestionStory from '../components/QuestionStory'
import QuestionImages from '../components/QuestionImages';
import QuestionDefinition from "../components/QuestionDefinitions";
import { STORY_STAGE, DEFINITIONS_STAGE, IMAGES_STAGE, NEXT_QUESTION } from "../Const"
import axios from 'axios';




export default function QuestionScreen(props) {

    const [questionStage, setQuestionStage] = useState(STORY_STAGE); 
    const [isLoading, setIsLoading] = useState(true); 
    const [questionData, setQuestionData] = useState({}); 
    const [storiesIds, setStoriesIds] = useState([]);
    const [currStoryId, setCurrStoryId] = useState(0);
    const [notFound, setNotFound] = useState(false);
    
    
    useEffect(() => {
        get_question_details(props.match.params.id);
      });



    //   const get_stories_ids = () => {
    //     axios.get(`http://localhost:8000/api/stories/`)
    //     .then((response) => {
    //         setQuestionData(response.data);
    //         setIsLoading(false);
    //   }
    //     ).catch((error) => {
    //       console.log(error.name + " " + error.response.status + ": " + error.response.data.detail);
    //       })     
    //   }

    const get_question_details = id => {
        axios.get(`http://localhost:8000/api/stories/${id}/story_question/`)
        .then((response) => {
            console.log(response);
            setQuestionData(response.data);
            setIsLoading(false);
      }
        ).catch((error) => {
            setNotFound(true);
            setIsLoading(false);
          console.log(error.name + " " + error.response.status + ": " + error.response.data.detail);
          })
    } 


    function renderQuestionStage(){
        if (isLoading) {
            return <h1>Loading</h1>
        }

        if (notFound) {
            return <h1>Story Not Found...</h1>
        }

        if (questionStage === STORY_STAGE) {
            return (
                <div>
                    <h1>Please read the following story. You will be presented with questions afterwards</h1>
                    <QuestionStory story={questionData.story} setQuestionStage={setQuestionStage}/>
                </div>
            )
        }

        if (questionStage === DEFINITIONS_STAGE) {
            return (
                <div>
                    <h1>You will now be presented with a word and several definitions. Choose the correct definition</h1>
                    <QuestionDefinition data={questionData} setQuestionStage={setQuestionStage}/>
                </div>
            )
        }

        if (questionStage === IMAGES_STAGE){
            return (
                <div>
                    <h1>You will now be presented with a word and several images. Choose the correct image</h1>
                    <QuestionImages data={questionData} setQuestionStage={setQuestionStage}/>
                </div>
            )
        }

        if (questionStage === NEXT_QUESTION){
            setQuestionStage(STORY_STAGE);
            const nextQuestionId = Number(props.match.params.id) - '0' + 1; //need to replace this
            get_question_details(nextQuestionId);
            props.history.push(`/questions/${nextQuestionId}`)
        }


        
        console.log(questionStage);
    }


    return(
        <div>
            {renderQuestionStage()}
        </div>
    )
}

