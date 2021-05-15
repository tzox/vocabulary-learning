# vocabulary-learning

Vocabulary learning tool:
* Vocabulary is taught in groups of 4 words.
* The lesson starts by presenting a story which contains those 4 words.
* After the story has been read by the students, We are asking them set of questions
  * Definitions Matching Task - We are presenting the definition of the word and
  presenting 4 dictractors (other definitions from other words in our database)
  * Image Recognition Task - We are showing the image and asking which word it
  representing
  * Students can pass to the next question only when they select the right answer.


Backend API endpoints explained:
  - /api/stories/ - retrieves a list of all the stories ids. We will use this list inside the application to keep note of stories the user already finished 
    - The user can restart again after going through all the stories
  - /api/stories/XXX - retrieves a random question generated for a specific story with the id XXX.
    A questions consists of:
    - a 'correct' word which appears in the story
    - 4 'other' words which may or may not appear in the story
      - each words contains the word itself, it's definition and a url to an image
      

## Built with

* Python (Django & Django Rest Framework)
* React


 ## Installation

### 1. Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the packages in backend/requirements.txt

```bash
pip install -r requirements.txt
```

### 2. Enter 'backend/frontend' folder

#### Use the package manager [npm](https://www.npmjs.com/) to install the node modules and to build the react project

```bash
npm install
```
```bash
npm run
```
    

## Run

### Enter '/backend' folder and run:

```bash
python manage.py runserver
```
