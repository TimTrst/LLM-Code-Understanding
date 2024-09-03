import {Card, CardContent, Checkbox, FormControlLabel, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import AccordionItem from "./AccordionItem";
import questionsInit from "./QuestionsInit";
import questionsEnd from "./QuestionsEnd";

const ResultCard = ({title, score, selectSummary,explainSummary, quizType}) => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if(quizType === "pre"){
            setQuestions(questionsInit)
        }else{
            setQuestions(questionsEnd)
        }
    }, [quizType]);

    return (
        <Card color="fourthColor.main" sx={{minHeight:"15vw"}}>
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="h6">Score: {score}/5</Typography>
                <FormControlLabel
                            control={<Checkbox disabled={true}
                                               checked={true}/>}
                            label={"Correct Answer"}/>
                <FormControlLabel
                            control={<Checkbox sx={{'&.Mui-checked': {
                                    color: "green"
                                }}} disabled={true}
                                               checked={true}/>}
                            label={"User Answer Correct"}/>
                <FormControlLabel
                            control={<Checkbox sx={{'&.Mui-checked': {
                                    color: "red"
                                }}} disabled={true}
                                               checked={true}/>}
                            label={"User Answer Wrong"}/>
                <Box mt={2}>
                    <Typography variant="subtitle1">Questions:</Typography>
                    {questions.length !== 0 && Object.keys(questions).map((item, index) => (
                           <AccordionItem key={index} question={questions[index]} selectSummary={selectSummary} explainSummary={explainSummary} questionType={questions[index].type}/>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}

ResultCard.propTypes = {
    title: PropTypes.string,
    score: PropTypes.number,
    selectSummary: PropTypes.object,
    explainSummary: PropTypes.object,
    quizType: PropTypes.string,
};

export default ResultCard


