import React from 'react'
import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
	Accordion,
	AccordionSummary,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Radio,
	AccordionDetails,
	useMediaQuery,
} from '@mui/material'
import { Replay, ExpandMore } from '@mui/icons-material'

type ResultCardProps = {
	totalScore: number
	questions: Array<Record<string, any>>
}

const ResultCard: React.FC<ResultCardProps> = ({ totalScore, questions }) => {
	const summary = questions.map((ques) => {
		const result = [...ques.incorrect_answers, ques.correct_answer].map((ians) => {
			return {
				option: ians,
				isSelected: ians === ques?.userAnswer,
				isCorrect: ians === ques.correct_answer,
			}
		})

		return {
			question: ques.question,
			type: ques.type,
			result,
		}
	})

	const isSmall = useMediaQuery('(max-width: 600px)')

	return (
		<Card
			sx={{ minWidth: 275, padding: isSmall ? '1rem' : '2rem', borderWidth: isSmall ? '0' : '1' }}
			variant='outlined'
		>
			<CardContent sx={{ padding: 0 }}>
				<Typography variant={isSmall ? 'h4' : 'h2'} sx={{ textAlign: 'center' }} color='text.secondary' gutterBottom>
					Your Score
				</Typography>
				<Typography variant={isSmall ? 'h4' : 'h2'} sx={{ textAlign: 'center' }} color='text.secondary' gutterBottom>
					{totalScore} / {questions.length}
				</Typography>

				{summary.map((question) => {
					return (
						<Accordion key={question.question}>
							<AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
								<Typography
									variant={isSmall ? 'body2' : 'body1'}
									dangerouslySetInnerHTML={{ __html: question.question }}
								></Typography>
							</AccordionSummary>
							<AccordionDetails>
								<FormGroup>
									{question.result.map((result) => {
										return (
											<FormControlLabel
												value={result.option}
												label={<span dangerouslySetInnerHTML={{ __html: result.option }}></span>}
												key={result.option}
												checked={result.isSelected || result.isCorrect}
												control={
													question.type === 'multiple' ? (
														<Checkbox
															color={`${result.isCorrect ? 'success' : result.isSelected ? 'error' : 'default'}`}
															size='medium'
														/>
													) : (
														<Radio
															color={`${result.isCorrect ? 'success' : result.isSelected ? 'error' : 'default'}`}
															size='medium'
														/>
													)
												}
											/>
										)
									})}
								</FormGroup>
							</AccordionDetails>
						</Accordion>
					)
				})}
			</CardContent>
			<CardActions sx={{ justifyContent: 'center', marginTop: '1rem' }}>
				<Button
					variant='outlined'
					size={isSmall ? 'small' : 'large'}
					onClick={() => window.location.reload()}
					endIcon={<Replay />}
				>
					Start Over
				</Button>
			</CardActions>
		</Card>
	)
}

export default ResultCard
