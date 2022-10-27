import React from 'react'
import { Typography, Button, FormGroup, FormControlLabel, Checkbox, Radio, useMediaQuery } from '@mui/material'
import { East, West } from '@mui/icons-material'
import './QuestionPaper.css'
import { QuestionPaperProps } from '../types/common'

const QuestionPaper: React.FC<QuestionPaperProps> = ({
	questions,
	currentQuestion,
	currentQuestionIndex,
	onMark,
	onNext,
	onPrev,
}) => {
	const isSmall = useMediaQuery('(max-width: 600px)')

	return (
		<div className='question'>
			<div className='question--title'>
				<Typography
					variant={isSmall ? 'h4' : 'h2'}
					sx={{ fontWeight: 300 }}
					dangerouslySetInnerHTML={{ __html: `${currentQuestionIndex + 1}. ${currentQuestion.question}` }}
				></Typography>
			</div>
			<div className='question--options'>
				<FormGroup>
					{currentQuestion.type === 'multiple' &&
						currentQuestion.options.map((option) => {
							return (
								<FormControlLabel
									value={option}
									label={<span dangerouslySetInnerHTML={{ __html: option }}></span>}
									key={option}
									checked={currentQuestion?.userAnswer === option}
									control={<Checkbox size='medium' />}
									onChange={(event) => onMark({ currentQuestion, option, event })}
								/>
							)
						})}
				</FormGroup>

				<FormGroup>
					{currentQuestion.type === 'boolean' &&
						currentQuestion.options.map((option) => {
							return (
								<FormControlLabel
									value={option}
									label={<span dangerouslySetInnerHTML={{ __html: option }}></span>}
									key={option}
									control={<Radio size='medium' />}
									checked={currentQuestion?.userAnswer === option}
									onChange={(event) => onMark({ currentQuestion, option, event })}
								/>
							)
						})}
				</FormGroup>
			</div>
			<div className='question--actions'>
				<Button
					disabled={currentQuestionIndex === 0}
					variant='outlined'
					size={isSmall ? 'small' : 'large'}
					onClick={() => onPrev()}
					startIcon={<West />}
				>
					Previous
				</Button>

				<Button variant='outlined' size={isSmall ? 'small' : 'large'} onClick={() => onNext()} endIcon={<East />}>
					{currentQuestionIndex === questions.length - 1 ? 'See Result' : 'Next'}
				</Button>
			</div>
		</div>
	)
}

export default QuestionPaper
