import React, { useState, useEffect } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import {USER_NO_ANSWER, USER_CORRECT_ANSWER, USER_WRONG_ANSWER, IMAGES_STAGE} from '../Const';

const QuestionDefinition = props => {
  const [selectedChoice, setSelectedChoice] = useState(0);
  const [definitionArr, setDefinitions] = useState([]);
  const [correctWord, setCorrectWord] = useState({});
  const [correctWordIndex, setCorrectWordIndex] = useState(0);      
  const [isUserCorrect, setIsUserCorrect] = useState(USER_NO_ANSWER);
  
    useEffect(() => {
            console.log("BLLAA", USER_NO_ANSWER)

            const definitionArr = props.data.other_words;
            const correctWord = props.data.correct_word
 
            const correctWordIndex = Math.floor(Math.random() * 4) 

            definitionArr.splice(correctWordIndex, 0, correctWord)
            console.log(definitionArr);          
            setDefinitions(definitionArr);
            setCorrectWord(correctWord);
            setCorrectWordIndex(correctWordIndex);
            console.log(correctWordIndex);
            console.log(correctWord);    

      }, []);


    const handleChange = event => {
      setSelectedChoice(Number(event.target.value));
    };

    const handleVote = () => {
      console.log(selectedChoice);
      console.log(correctWordIndex);
      if (selectedChoice === correctWordIndex) {
        setIsUserCorrect(USER_CORRECT_ANSWER);
      }
      else{
        setIsUserCorrect(USER_WRONG_ANSWER);
      }
    }


const nextQuestion = () => {
  props.setQuestionStage(IMAGES_STAGE);
}
const renderAnswerResponse = () => {
  if (isUserCorrect == USER_CORRECT_ANSWER){
    return (
      <div>
        <h3>Correct!</h3>
        <Button
                onClick = {() => nextQuestion() } 
                color="primary" 
                size="large">
                Continue to next question
            </Button>
      </div>
    )
  }

  if (isUserCorrect == USER_WRONG_ANSWER){
    return (
      <div>
        <h3>Wrong! Try again</h3>
      </div>
    )
  }

}

return (
          <div>
            <h1>{correctWord.word_text}</h1>
              <RadioGroup onChange={handleChange} value={selectedChoice}>
              <List>  
                      {definitionArr.map((word, idx) => 
                          (
                              <ListItem alignItems="flex-start"  key ={idx}>
                                  <ListItemText
                                  primary={
                                      <FormControlLabel 
                                      name="radio-buttons"
                                      value = {idx} control={<Radio />} 
                                      label={word.word_definition} />
                                  }
                                  />
                              </ListItem>
                          )
                      )}
              </List>
              </RadioGroup>
              <Button
                onClick = {() => handleVote() } 
                color="primary" 
                size="large">
                Send Answer
            </Button>
              <p>{renderAnswerResponse()}</p>
          </div>
)

}


export default QuestionDefinition;
