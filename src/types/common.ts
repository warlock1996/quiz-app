import { FormEvent, SyntheticEvent } from 'react'

export type Question = {
	category: string
	correct_answer: string
	difficulty: string
	incorrect_answers: Array<string>
	question: string
	type: string
	userAnswer?: string
	options?: Array<string>
}

export type FormState = {
	category: string
	difficulty: string
	type: string
	amount: string
}

export type FormProps = {
	onSubmit: (event: FormEvent, data: FormState) => void
	loading: boolean
}

export type onMarkParams = {
	currentQuestion: Question
	option: string
	event: SyntheticEvent<Element, Event>
}

export type QuestionPaperProps = {
	questions: Array<Question>
	currentQuestion: Question
	currentQuestionIndex: number
	onMark: (data: onMarkParams) => void
	onNext: () => void
	onPrev: () => void
}

