import React, { useState, useEffect } from "react";
import QuestionStory from '../components/QuestionStory'

export default function QuestionScreen(props) {
    const [questionStage, setQuestionStage] = useState(0); 


    function renderQuestionStage(){
        if (questionStage == 0) {
            return <QuestionStory />
        }

        return <div>check</div>
    }


    return(
        <div>
            {renderQuestionStage()}
        </div>
    )
}

