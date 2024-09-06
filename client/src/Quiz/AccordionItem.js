import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Accordion, AccordionSummary, AccordionDetails, Typography, Box} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Question from "./Question";

/**
 * The `AccordionItem` renders a Question component for every quiz result item. The Question component is reused
 * to show the questions of the quizzes, but filled with the correct answers and the user answers.
 *
 * @param {Object} question - The question object to be rendered
 * @param {Object} selectSummary - The multiple-choice results with correct and wrong answers
 * @param {function} explainSummary - The explain-type results with correct answer or feedback
 * @param {function} questionType - The type of question (multiple choice or explain-type)
 *
 * @returns {JSX.Element} The JSX code for rendering the AccordionItem component.
 */
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
                            {explainSummary[question.id].feedback &&
                                <Box>
                                    <Typography variant="subtitle1">Answer Feedback</Typography>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {/*explainSummary[question.id].correct_answer.text*/}
                                        {explainSummary[question.id].feedback}
                                    </ReactMarkdown>
                                </Box>
                            }
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
