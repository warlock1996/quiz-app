import React from 'react'
import { Skeleton, Stack } from '@mui/material'

export default function ResultSkeleton() {
	return (
		<Stack spacing={1.5} style={{ margin: '1rem' }} justifyContent='center' alignItems="center">
			<Skeleton variant='rounded' width={500} height={150} animation='wave' />
			<Skeleton variant='rounded' width={500} height={55} />
			<Skeleton variant='rounded' width={500} height={55} />
			<Skeleton variant='rounded' width={500} height={55} />
			<Skeleton variant='rounded' width={500} height={55} />
			<Skeleton variant='rounded' width={500} height={50} />
			<Skeleton variant='rounded' width={250} height={50} />
		</Stack>
	)
}
