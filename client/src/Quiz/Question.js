import React from 'react'
import PropTypes from "prop-types"
import {Button, Container} from "@mui/material"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Question = ({ questionText, answers, onAnswer }) => {
  return (
    <Container sx={{height:'fit-content', padding:3, margin:2}}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {questionText}
        </ReactMarkdown>
      {answers.map((answer, index) => (
        <Button sx={{mx:1}} key={index} onClick={() => onAnswer(answer)} >
          {answer.text}
        </Button>
      ))}
    </Container>
  )
}


Question.propTypes = {
   questionText: PropTypes.string,
   answers: PropTypes.array,
   onAnswer: PropTypes.func,
}

export default Question
