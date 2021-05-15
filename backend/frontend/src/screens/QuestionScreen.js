import React, { useState, useEffect } from "react";
import QuestionStory from '../components/QuestionStory'
import Question from '../components/Question';
import { STORY_STAGE, DEFINITIONS_STAGE, IMAGES_STAGE, QUESTION_DEFINITIONS, QUESTION_IMAGE } from "../Const"
import axios from 'axios';
import Container from '@material-ui/core/Container';


const QuestionScreen = (props) => {
    const [questionStage, setQuestionStage] = useState(STORY_STAGE); 
    const [isLoading, setIsLoading] = useState(true); 
    const [questionData, setQuestionData] = useState({}); 
    const [notFound, setNotFound] = useState(false);

    const generateRandomQuestion = () => {
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

    //whenever the current story index changes - read a random question for the new story
    useEffect(() => {
        generateRandomQuestion();
      }, [props.storyId]);





    const nextQuestion = () => {
        setQuestionStage(STORY_STAGE);
        props.continueToNextQuestion();
        
    }
    const moveToDefinitionQuestion = () => {
        setQuestionStage(DEFINITIONS_STAGE);
    }


    //I decided to generate a new random question before continuing to the image question
    //If I use the same question generated before - the answer appears in the previous question
    //and it seems quite easy
    const moveToImageQuestion = () => {
        setIsLoading(true);
        generateRandomQuestion();
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
            <Container>
                <p>{`Current story category: ${questionData.story_category_name}`}</p>
                {renderQuestionStage()}
            </Container>
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