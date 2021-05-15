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
    const [notFound, setNotFound] = useState(false);

    //whenever the current story index changes - read a random question for the new story
    useEffect(() => {
        get_question_details(props.storyId);
      }, []);


    const get_question_details = id => {
        axios.get(`http://localhost:8000/api/stories/${props.storyId}/story_question/`)
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


    const nextQuestion = () => {
        setQuestionStage(STORY_STAGE);
        props.continueToNextQuestion();
        
    }
    const moveToDefinitionQuestion = () => {
        setQuestionStage(DEFINITIONS_STAGE);
    }

    const moveToImageQuestion = () => {
        setQuestionStage(IMAGES_STAGE);
    }



    const renderMain = () => {
        if (isLoading) {
            return <h1>Loading</h1>
        }

        if (notFound) {
            return <h1>Story Not Found...</h1>
        }

        return(
            <div>
                <p>Current story category: {questionData.story.story_catgory_name}</p>
                {renderQuestionStage()}
            </div>
        )
    }

    function renderQuestionStage(){
        if (questionStage === STORY_STAGE) {
            return (
                <div>
                    <h3>Please read the following story. You will be presented with questions afterwards</h3>
                    <QuestionStory story={questionData.story} moveToNextPage={moveToDefinitionQuestion}/>
                </div>
            )
        }

        if (questionStage === DEFINITIONS_STAGE) {
            return (
                <div>
                    <h3>You will now be presented with a word and several definitions. Choose the correct definition</h3>
                    <QuestionDefinition data={questionData} moveToNextPage={moveToImageQuestion}/>
                </div>
            )
        }

        if (questionStage === IMAGES_STAGE){
            return (
                <div>
                    <h3>Which word represents the following image?</h3>
                    <QuestionImages data={questionData} 
                        moveToNextPage={nextQuestion}/>
                </div>
            )
        }
    }


    return(
        <div>
            {renderMain()}
        </div>
    )
}

