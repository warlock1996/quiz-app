import React from 'react'
import { Skeleton, Stack, useMediaQuery } from '@mui/material'

export default function FormSkeleton() {
	const isSmall = useMediaQuery('(max-width: 600px)')

	return (
		<Stack spacing={1.5} style={{ margin: '1rem' }}>
			<Skeleton variant='rounded' width={isSmall ? '100%' : 500} height={isSmall ? 100 : 150} animation='wave' />
			<Skeleton variant='rounded' width={isSmall ? '100%' : 500} height={isSmall ? 35 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '100%' : 500} height={isSmall ? 35 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '100%' : 500} height={isSmall ? 35 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '100%' : 500} height={isSmall ? 35 : 55} />
			<Skeleton variant='rounded' width={isSmall ? '100%' : 500} height={isSmall ? 35 : 50} />
		</Stack>
	)
}
