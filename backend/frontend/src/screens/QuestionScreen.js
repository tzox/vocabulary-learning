import React, { useState, useEffect } from "react";
import QuestionStory from '../components/QuestionStory'
import QuestionImages from '../components/QuestionImages';
import QuestionDefinition from "../components/QuestionDefinitions";
import { STORY_STAGE, DEFINITIONS_STAGE, IMAGES_STAGE, NEXT_QUESTION } from "../Const"
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";



export default function QuestionScreen(props) {

    const [questionStage, setQuestionStage] = useState(STORY_STAGE); 
    const [isLoading, setIsLoading] = useState(true); 
    const [questionData, setQuestionData] = useState({}); 
    // const [currStoryId, setCurrStoryId] = useState(props.match.params.id);
    const [notFound, setNotFound] = useState(false);
    const [currStoryIndex, setCurrStoryIndex] = useState(null);   
    const history = useHistory();
    const params = useParams();

    // read all stories ids
    //randomly select one and get it's question details
    //after finishing a 

    
    //read all the available story ids in the initial load
    // useEffect(() => {
    //     get_stories_ids();
    //   }, []);


    //whenever the current story index changes - read a random question for the new story
    useEffect(() => {
        // setQuestionStage(STORY_STAGE);
        get_question_details(params.id);
      }, []);

    //   const extractIds = (jsonArr) => {
    //     let idsArr = [];
    //     for (let i =0, n=jsonArr.length; i < n; i++){
    //         const currId = jsonArr[i].id
    //         idsArr.push(currId);
    //     }
    //     return idsArr
    // }

    //   const get_stories_ids = () =>{
    //     axios.get(`http://localhost:8000/api/stories/`)
    //     .then((response) => {
    //         const ids = extractIds(response.data);
    //         setQuestionIdsArr(ids);
    //         setCurrStoryIndex(0);
    //   }
    //     ).catch((error) => {
    //       console.log(error.name + " " + error.response.status + ": " + error.response.data.detail);
    //       })
    //   }


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


    const nextQuestion = () => {
        const nextQuestionId = Number(params.id) - '0' + 1; //need to replace this
        setCurrStoryIndex(currStoryIndex + 1);
        // const nextQuestionId = Number(props.match.params.id) - '0' + 1; //need to replace this
        // get_question_details(nextQuestionId); //update state
        history.push('', {userAnswered: true}) //change url
        
    }

    const moveToDefinitionQuestion = () => {
        setQuestionStage(DEFINITIONS_STAGE);
    }

    const moveToImageQuestion = () => {
        setQuestionStage(IMAGES_STAGE);
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
                    <QuestionStory story={questionData.story} moveToNextPage={moveToDefinitionQuestion}/>
                </div>
            )
        }

        if (questionStage === DEFINITIONS_STAGE) {
            return (
                <div>
                    <h1>You will now be presented with a word and several definitions. Choose the correct definition</h1>
                    <QuestionDefinition data={questionData} moveToNextPage={moveToImageQuestion}/>
                </div>
            )
        }

        if (questionStage === IMAGES_STAGE){
            return (
                <div>
                    <h1>Which word represents the following image?</h1>
                    <QuestionImages data={questionData} 
                        moveToNextPage={nextQuestion}/>
                </div>
            )
        }

        if (questionStage === NEXT_QUESTION){
            setQuestionStage(STORY_STAGE);
            const nextQuestionId = Number(params.id) - '0' + 1; //need to replace this
            // const nextQuestionId = Number(props.match.params.id) - '0' + 1; //need to replace this
            // get_question_details(nextQuestionId); //update state
            props.history.push(`/questions/${nextQuestionId}`) //change url


        }


        
        console.log(questionStage);
    }




    return(
        <div>
            {renderQuestionStage()}
        </div>
    )
}

