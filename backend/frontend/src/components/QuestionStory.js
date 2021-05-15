import React from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const QuestionStory = ({ story, moveToNextPage }) => {


return (
          <div>
            <h1>{story.story_category}</h1>
            <p>{story.story_text}</p>



            {/* <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid> */}



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
