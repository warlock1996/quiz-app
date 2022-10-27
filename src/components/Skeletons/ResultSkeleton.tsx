import React from 'react'
import { Skeleton, Stack, useMediaQuery } from '@mui/material'

export default function ResultSkeleton() {
	const isSmall = useMediaQuery('(max-width: 600px)')

	return (
		<Stack spacing={1.5} style={{ margin: '1rem' }} justifyContent='center' alignItems='center'>
			<Skeleton variant='rounded' width={isSmall ? '95%' : 500} height={isSmall ? 100 : 150} animation='wave' />
			<Skeleton variant='rounded' width={isSmall ? '95%' : 500} height={isSmall ? 40 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '95%' : 500} height={isSmall ? 40 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '95%' : 500} height={isSmall ? 40 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '95%' : 500} height={isSmall ? 40 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '95%' : 500} height={isSmall ? 40 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '60%' : 250} height={isSmall ? 40 : 50} />
		</Stack>
	)
}
