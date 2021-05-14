import React, { useState, useEffect } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import {USER_NO_ANSWER, USER_CORRECT_ANSWER, USER_WRONG_ANSWER, DEFINITIONS_STAGE} from '../Const';

const QuestionStory = ({ story, setQuestionStage }) => {

const nextQuestion = () => {
  setQuestionStage(DEFINITIONS_STAGE);
}


return (
          <div>
            <h1>{story.story_category}</h1>
            <p>{story.story_text}</p>
              <Button
                onClick = {() => nextQuestion() } 
                color="primary" 
                size="large">
                See Question
            </Button>
          </div>
)

}


export default QuestionStory;
