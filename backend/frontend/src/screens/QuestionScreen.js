import React, { useState, useEffect } from "react";
import QuestionStory from '../components/QuestionStory'
import Question from '../components/Question';
import { STORY_STAGE, DEFINITIONS_STAGE, IMAGES_STAGE, QUESTION_DEFINITIONS, QUESTION_IMAGE } from "../Const"
import axios from 'axios';



const QuestionScreen = (props) => {
    const [questionStage, setQuestionStage] = useState(STORY_STAGE); 
    const [isLoading, setIsLoading] = useState(true); 
    const [questionData, setQuestionData] = useState({}); 
    const [notFound, setNotFound] = useState(false);

    //whenever the current story index changes - read a random question for the new story
    useEffect(() => {
        const get_question_details = id => {
            axios.get(`http://localhost:8000/api/stories/${props.storyId}/`)
            .then((response) => {
                setQuestionData(response.data);
                setIsLoading(false);
          }
            ).catch((error) => {
                setNotFound(true);
                setIsLoading(false);
              })
        } 
        get_question_details(props.storyId);
      }, [props]);





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
                <p>Current story category: {questionData.story_category_name}</p>
                {renderQuestionStage()}
            </div>
        )
    }

    const renderQuestionStage = () => {
        if (questionStage === STORY_STAGE) {
            return (
                <div>
                    <h3>Please read the following story. You will be presented with questions afterwards</h3>
                    <QuestionStory story={questionData} moveToNextPage={moveToDefinitionQuestion}/>
                </div>
            )
        }

        if (questionStage === DEFINITIONS_STAGE) {
            return (
                    <Question data={questionData} 
                        moveToNextPage={moveToImageQuestion}
                        instructionText="Choose the correct definition"
                        choiceField="word_definition"
                        questionType = {QUESTION_DEFINITIONS}
                        />
                )
            }
        if (questionStage === IMAGES_STAGE){
            return (
                <Question data={questionData} 
                    moveToNextPage={nextQuestion}
                    instructionText="Choose the word the image represents"
                    choiceField="word_text"
                    questionType = {QUESTION_IMAGE}
                />
            )
        }
    }


    return(
        <div>
            {renderMain()}
        </div>
    )
}


export default QuestionScreen;