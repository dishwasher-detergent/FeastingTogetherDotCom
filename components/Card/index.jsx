const Card = ({ children, step }) =>
{
	return (
		<div className='card max-w-full h-full w-[30rem] md:h-[44rem] shadow-lg'>
			<div className='h-3/5 p-4 flex flex-col items-center justify-center gap-4'>
				{children[0]}
			</div>
			<div className='flex-none w-full h-2/5 flex flex-row p-4'>
				<div className='flex-none w-full h-full flex flex-row'>
					{step ? <div className='h-full pr-4 flex-none'>
						<div className='flex items-center justify-center rounded-full h-8 min-w-[2rem] px-1.5 bg-primary-50 text-primary-600 font-bold border border-primary-600'>
							<p>{step}</p>
						</div>
					</div>: null}
					{children[1]}
				</div>
			</div>
		</div>
	)
}

export default Card;