import React from 'react'
import { Skeleton, Stack, Divider } from '@mui/material'

export default function QuestionSkeleton() {
	return (
		<Stack style={{ marginTop: '4rem' }}>
			<Skeleton variant='text' sx={{ fontSize: '3rem' }} />
			<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={300} />
			<br />
			<br />
			<Stack spacing={0.1} style={{ margin: '1rem 0 2rem 0' }}>
				<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={350} />
				<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={350} />
				<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={350} />
				<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={350} />
			</Stack>
		</Stack>
	)
}
