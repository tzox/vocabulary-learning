import React, { useState, useEffect } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {USER_NO_ANSWER, USER_CORRECT_ANSWER, USER_WRONG_ANSWER } from '../Const';

const QuestionImages = props => {
  const [selectedChoice, setSelectedChoice] = useState(0);
  const [definitionArr, setDefinitions] = useState([]);
  const [correctWord, setCorrectWord] = useState({});
  const [correctWordIndex, setCorrectWordIndex] = useState(0);      
  const [isUserCorrect, setIsUserCorrect] = useState(USER_NO_ANSWER);


    useEffect(() => {
            const otherWordsArr = props.data.other_words.slice(0); //create a copy so not to edit the prop array
            const correctWord = props.data.correct_word
 
            //randomly select the location of the correct answer
            const correctWordIndex = Math.floor(Math.random() * 5) 

            //insert the correct answer to the array with the other answers
            otherWordsArr.splice(correctWordIndex, 0, correctWord)
            console.log(otherWordsArr);          
            setDefinitions(otherWordsArr);
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


const renderAnswerResponse = () => {
  if (isUserCorrect === USER_CORRECT_ANSWER){
    return (
      <div>
        <h3>Correct!</h3>
        <Button
                onClick = {() => props.moveToNextPage() } 
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
        <Container component="main" maxWidth="l" style={{display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"}}>
            <img 
                alt="describe this"
                style ={{width:200, height: 200}}
                src={correctWord.word_image_url} />
              <RadioGroup onChange={handleChange} value={selectedChoice}>
              <List>  
                      {definitionArr.map((word, idx) => 
                          (
                              <ListItem alignItems="flex-start"  key ={idx}>
                                  <ListItemText
                                  primary={
                                      <FormControlLabel 
                                      name="radio-buttons"
                                      value = {idx} control={<Radio/> }
                                      label={word.word_text} />
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


export default QuestionImages;
