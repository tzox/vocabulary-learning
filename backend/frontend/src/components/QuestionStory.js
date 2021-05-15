import React from "react";
import Button from '@material-ui/core/Button';

const QuestionStory = (props) => {
  const { story, moveToNextPage } = props;
  const { story_category, story_text } = story;
  
  return (
            <div>
              <h1>{story_category}</h1>
              <p>{story_text}</p>
                <Button
                  onClick = {() => moveToNextPage() } 
                  color="primary" 
                  size="large">
                  See Question
              </Button>

            </div>
  )
}

export default QuestionStory;
