import React from 'react';

const Loader = () => (
	<div
		style={{
			background: '#f9fafb',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			paddingBottom: '5rem',
		}}
	>
		<div class="lds-roller">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
);

export default Loader;
