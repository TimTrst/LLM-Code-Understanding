import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Accordion, AccordionSummary, AccordionDetails, Typography, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Question from "./Question";

const AccordionItem = ({question, selectSummary, explainSummary, questionType}) => {
    const [expanded, setExpanded] = useState(false)

    const handleChange = () => {
        setExpanded(!expanded)
    }

    const hasExplainResults = explainSummary && explainSummary[question.id] && Object.keys(explainSummary[question.id]).length > 0

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel-content"
                id="panel-header"
            >
                <Typography>{question.heading}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {questionType === "MC" ? (
                    <Question question={question} selectedAnswers={selectSummary} isEvaluated={true}/>
                ) : (
                    hasExplainResults ? (
                        <Box>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {question.heading}
                            </ReactMarkdown>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {question.text}
                            </ReactMarkdown>
                            <Typography variant="subtitle1">Your Answer</Typography>
                            <Typography variant="body2" sx={{
                                color: explainSummary[question.id].is_correct ? 'green' : 'red',
                                padding: '10px',
                                borderRadius: '5px'
                            }}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {explainSummary[question.id].user_answer}
                                </ReactMarkdown>
                            </Typography>
                            <Typography variant="subtitle1">Correct Answer</Typography>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {explainSummary[question.id].correct_answer.text}
                            </ReactMarkdown>
                        </Box>
                    ) : (
                        <Typography variant="body2">No explanation results available.</Typography>
                    )
                )}
            </AccordionDetails>
        </Accordion>
    );
};

AccordionItem.propTypes = {
    question: PropTypes.object.isRequired,
    selectSummary: PropTypes.object,
    explainSummary: PropTypes.object,
    questionType: PropTypes.string.isRequired
};

export default AccordionItem;
