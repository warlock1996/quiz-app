import React from 'react'
import { Skeleton, Stack, useMediaQuery } from '@mui/material'

export default function QuestionSkeleton() {
	const isSmall = useMediaQuery('(max-width: 600px)')

	return (
		<Stack style={{ marginTop: '4rem' }}>
			<Skeleton variant='text' sx={{ fontSize: '3rem' }} width='100%' />
			<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={isSmall ? '70%' : '50%%'} />
			<br />
			<br />
			<Stack spacing={0.1} style={{ margin: '1rem 0 2rem 0' }}>
				<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={isSmall ? '100%' : 300} />
				<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={isSmall ? '100%' : 300} />
				<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={isSmall ? '100%' : 300} />
				<Skeleton variant='text' sx={{ fontSize: '3rem' }} width={isSmall ? '100%' : 300} />
			</Stack>
		</Stack>
	)
}
