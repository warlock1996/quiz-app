import React from 'react'
import { Skeleton, Stack } from '@mui/material'

export default function FormSkeleton() {
	return (
		<Stack spacing={1.5} style={{ margin: '1rem' }}>
			<Skeleton variant='rounded' width={500} height={150} animation="wave" />
			<Skeleton variant='rounded' width={500} height={55} />
			<Skeleton variant='rounded' width={500} height={55} />
			<Skeleton variant='rounded' width={500} height={55} />
			<Skeleton variant='rounded' width={500} height={55} />
			<Skeleton variant='rounded' width={500} height={50} />
		</Stack>
	)
}
