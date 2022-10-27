import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Button, Typography, useMediaQuery } from '@mui/material'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import './Form.css'
import { FormProps, FormState } from '../types/common'

const diffculties = [
	{ id: 1, name: 'easy' },
	{ id: 2, name: 'medium' },
	{ id: 3, name: 'hard' },
]

const types = [
	{ id: 1, name: 'multiple' },
	{ id: 2, name: 'boolean' },
]

const questions = [
	{ id: 0, value: 5 },
	{ id: 1, value: 10 },
	{ id: 2, value: 20 },
	{ id: 3, value: 30 },
	{ id: 4, value: 40 },
	{ id: 5, value: 50 },
]

const Form: React.FC<FormProps> = ({ onSubmit, loading }) => {
	const [data, setData] = useState<FormState>({
		category: '',
		difficulty: '',
		type: '',
		amount: '',
	})
	const [categories, setCategories] = useState([])

	const isValidData = useMemo(() => {
		return data.category && data.difficulty && data.type && data.amount
	}, [data])

	useEffect(() => {
		fetch('https://opentdb.com/api_category.php')
			.then((res) => res.json())
			.then((res) => setCategories(res.trivia_categories))
	}, [])

	const onCategorySelect = (event) => {
		setData((prev) => ({ ...prev, category: event.target.value }))
	}
	const onDifficultySelect = (event) => {
		setData((prev) => ({ ...prev, difficulty: event.target.value }))
	}
	const onTypesSelect = (event) => {
		setData((prev) => ({ ...prev, type: event.target.value }))
	}
	const onNoOfQuestionSelect = (event) => {
		setData((prev) => ({ ...prev, amount: event.target.value }))
	}

	const isSmall = useMediaQuery('(max-width: 600px)')

	return (
		<form className='form' onSubmit={(event) => onSubmit(event, data)}>
			<Typography
				variant={isSmall ? 'h3' : 'h2'}
				sx={{ textAlign: 'center', fontWeight: 300 }}
				color='primary'
				gutterBottom
			>
				<ElectricBoltIcon color='primary' />
				Quizz App
			</Typography>

			<FormControl fullWidth className='form-control' size={isSmall ? 'small' : 'medium'}>
				<InputLabel id='demo-simple-select-label'>Category</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={data.category}
					label='Select Category'
					onChange={(event) => onCategorySelect(event)}
				>
					{categories.map((category) => (
						<MenuItem key={category.id} value={category.id}>
							{category.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth className='form-control' size={isSmall ? 'small' : 'medium'}>
				<InputLabel id='demo-simple-select-label'>Type</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={data.type}
					label='Select Type'
					onChange={(event) => onTypesSelect(event)}
				>
					{types.map((type) => (
						<MenuItem key={type.id} value={type.name}>
							{type.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth className='form-control' size={isSmall ? 'small' : 'medium'}>
				<InputLabel id='demo-simple-select-label'>Difficulty</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={data.difficulty}
					label='Select Difficulty'
					onChange={(event) => onDifficultySelect(event)}
				>
					{diffculties.map((difficulty) => (
						<MenuItem key={difficulty.id} value={difficulty.name}>
							{difficulty.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl fullWidth className='form-control' size={isSmall ? 'small' : 'medium'}>
				<InputLabel id='demo-simple-select-label'>Questions</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={data.amount}
					label='Select Questions'
					onChange={(event) => onNoOfQuestionSelect(event)}
				>
					{questions.map((question) => (
						<MenuItem key={question.id} value={question.value}>
							{question.value}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Button disabled={loading || !isValidData} variant='contained' size='large' fullWidth type='submit'>
				Start
			</Button>
		</form>
	)
}

export default Form
