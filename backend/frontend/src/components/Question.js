import React, { useState, useEffect } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import {USER_NO_ANSWER, USER_CORRECT_ANSWER, USER_WRONG_ANSWER, QUESTION_DEFINITIONS, QUESTION_IMAGE} from '../Const';
import Alert from '@material-ui/lab/Alert';

const Question = props => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [wordArr, setWordArr] = useState([]);
  const [correctWord, setCorrectWord] = useState({});
  const [correctWordIndex, setCorrectWordIndex] = useState(0);      
  const [isUserCorrect, setIsUserCorrect] = useState(USER_NO_ANSWER);
  const { instructionText, moveToNextPage, questionType, choiceField } = props;
  const { random_question } = props.data;
  const { other_words, correct_word } = random_question;


    useEffect(() => {
            const wordArr = other_words.slice(0); //copy the other words array so we won't edit it
            const correctWord = correct_word

            //randomly choose an index for the right answer
            const correctWordIndex = Math.floor(Math.random() * (wordArr.length + 1)) 

            wordArr.splice(correctWordIndex, 0, correctWord)       
            setWordArr(wordArr);
            setCorrectWord(correctWord);
            setCorrectWordIndex(correctWordIndex);

      }, [other_words, correct_word, questionType]);


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


    const renderQuestionType = () => {
        if (questionType === QUESTION_DEFINITIONS)
            return <h3>{`Word: ${correctWord.word_text}`}</h3> 
        if (questionType === QUESTION_IMAGE)
            return <img alt="describe this" style ={{width:256, height: 256}}
                    src={correctWord.word_image_url} />         
    }

    const nextQuestion = () => {
        setIsUserCorrect(USER_NO_ANSWER);
        setSelectedChoice(null);
        moveToNextPage();
    }

    const renderAnswerResponse = () => {
      if (isUserCorrect === USER_CORRECT_ANSWER)
        return (
          <div>
            <Alert severity="success">Correct!</Alert>
            <Button
                    onClick = {() => nextQuestion() } 
                    color="primary" 
                    size="large">
                    Continue to next question
                </Button>
          </div>
        )
      

  if (isUserCorrect === USER_WRONG_ANSWER)
    return <Alert severity="error">Wrong! Try again</Alert>

}


  const renderSendButton = () =>{
    if (isUserCorrect !== USER_CORRECT_ANSWER) {
      return (<Button
      onClick = {() => handleVote() } color="primary" size="large">
      Send Answer
  </Button>)
    }
  }


    return (
        <div>
            <h3>{instructionText}</h3>
            {renderQuestionType()}
                <RadioGroup onChange={handleChange} value={selectedChoice}>
                    <List>  
                        {wordArr.map((word, idx) => 
                            (
                            <ListItem alignItems="flex-start"  key ={idx}>
                                <ListItemText
                                primary={
                                    <FormControlLabel 
                                    name="radio-buttons"
                                    value = {idx} control={<Radio />} 
                                    label={word[choiceField]} />}
                                />
                            </ListItem>
                            )
                        )}
                    </List>
                </RadioGroup>
                {renderSendButton()}
                {renderAnswerResponse()}
        </div>
    )
}

export default Question;
