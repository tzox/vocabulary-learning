import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';

const QuestionStory = ({ story, moveToNextPage }) => {


return (
          <div>
            <h1>{story.story_category}</h1>
            <p>{story.story_text}</p>
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
