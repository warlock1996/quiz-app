import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Container } from '@mui/material'
import { lazy, useCallback, useState, Suspense, useRef, useMemo, FormEvent } from 'react'

import ResultSkeleton from './components/Skeletons/ResultSkeleton'
import FormSkeleton from './components/Skeletons/FormSkeleton'
import QuestionSkeleton from './components/Skeletons/QuestionSkeleton'
import { FormState, Question } from './types/common'

const Form = lazy(() => import('./components/Form'))
const QuestionPaper = lazy(() => import('./components/QuestionPaper'))
const ResultCard = lazy(() => import('./components/ResultCard'))

function App() {
	const [questions, setQuestions] = useState<Array<Question>>([])
	const [showForm, setShowForm] = useState<boolean>(true)
	const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false)
	const [showResult, setResult] = useState<boolean>(false)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
	const totalScore = useRef<number>(0)
	const currentQuestion = useMemo<Question>(() => {
		if (!questions.length) return null
		return {
			...questions[currentQuestionIndex],
			options: [
				...questions[currentQuestionIndex]['incorrect_answers'],
				questions[currentQuestionIndex]['correct_answer'],
			],
		}
	}, [currentQuestionIndex, questions])

	const onSubmitCallback = useCallback((event: FormEvent, data: FormState) => {
		event.preventDefault()
		setLoadingQuestions(true)
		fetch(
			`https://opentdb.com/api.php?amount=${data.amount}&difficulty=${data.difficulty}&category=${data.category}&type=${data.type}`
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.results.length) {
					setQuestions(res.results)
					setShowForm(false)
				} else {
					alert('results are empty ...')
				}
			})
			.finally(() => {
				setLoadingQuestions(false)
			})
	}, [])

	const onMarkCallback = useCallback(
		({ currentQuestion, option, event }) => {
			const index = questions.findIndex((ques) => currentQuestion.question === ques.question)
			if (index === -1) return

			setQuestions((prevQuestions) => {
				let newQuestions = [...prevQuestions]
				if (event.target.checked) {
					newQuestions[index] = { ...currentQuestion, userAnswer: option }
				} else {
					newQuestions[index] = { ...currentQuestion, userAnswer: '' }
				}
				return newQuestions
			})
		},
		[questions]
	)

	const onNextCallback = useCallback(() => {
		if (currentQuestion?.userAnswer && currentQuestion.userAnswer === currentQuestion.correct_answer) {
			totalScore.current += 1
		}

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
		} else {
			setResult(true)
		}
	}, [currentQuestion, currentQuestionIndex, questions])

	const onPrevCallback = useCallback(() => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
		}
	}, [currentQuestionIndex])

	return (
		<Container maxWidth={showResult ? 'sm' : showForm ? 'sm' : 'lg'} className='App' >
			{showResult ? (
				<Suspense fallback={<ResultSkeleton />}>
					<ResultCard totalScore={totalScore.current} questions={questions} />
				</Suspense>
			) : showForm ? (
				<Suspense fallback={<FormSkeleton />}>
					<Form onSubmit={onSubmitCallback} loading={loadingQuestions} />
				</Suspense>
			) : (
				<Suspense fallback={<QuestionSkeleton />}>
					<QuestionPaper
						questions={questions}
						currentQuestion={currentQuestion}
						currentQuestionIndex={currentQuestionIndex}
						onNext={onNextCallback}
						onMark={onMarkCallback}
						onPrev={onPrevCallback}
					/>
				</Suspense>
			)}
		</Container>
	)
}

export default App
