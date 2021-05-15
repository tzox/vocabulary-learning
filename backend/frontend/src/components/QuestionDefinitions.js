import React, { useState, useEffect } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import {USER_NO_ANSWER, USER_CORRECT_ANSWER, USER_WRONG_ANSWER} from '../Const';
import Container from '@material-ui/core/Container';

const QuestionDefinition = props => {
  const [selectedChoice, setSelectedChoice] = useState(0);
  const [definitionArr, setDefinitions] = useState([]);
  const [correctWord, setCorrectWord] = useState({});
  const [correctWordIndex, setCorrectWordIndex] = useState(0);      
  const [isUserCorrect, setIsUserCorrect] = useState(USER_NO_ANSWER);
  
    useEffect(() => {
            const definitionArr = props.data.other_words.slice(0); //copy the other words array so we won't edit it
            const correctWord = props.data.correct_word

            //randomly choose an index for the right answer
            const correctWordIndex = Math.floor(Math.random() * 5) 

            definitionArr.splice(correctWordIndex, 0, correctWord)       
            setDefinitions(definitionArr);
            setCorrectWord(correctWord);
            setCorrectWordIndex(correctWordIndex);

      }, [props.data]);


    const handleChange = event => {
      setSelectedChoice(Number(event.target.value));
    };

    const handleVote = () => {
      if (selectedChoice === correctWordIndex) {
        setIsUserCorrect(USER_CORRECT_ANSWER);
      }
      else{
        setIsUserCorrect(USER_WRONG_ANSWER);
      }
    }


    const nextQuestion = () => {
      props.moveToNextPage();
    }

    const renderAnswerResponse = () => {
      if (isUserCorrect === USER_CORRECT_ANSWER){
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

  if (isUserCorrect === USER_WRONG_ANSWER){
    return (
      <div>
        <h3>Wrong! Try again</h3>
      </div>
    )
  }
}

  return (
    <Container component="main">
      <h3>{correctWord.word_text}</h3>
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
    </Container>
  )
}


export default QuestionDefinition;
