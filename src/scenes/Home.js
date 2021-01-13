import React, { useState } from 'react';
import {
	Button,
	Divider,
	Grid,
	Segment,
	Dropdown,
	Input,
	Header,
} from 'semantic-ui-react';

const contentMap = {
	xbl: 'xbox',
	psn: 'playstation',
	acti: 'activision',
	battle: 'battle.net',
	uno: 'other',
};

const options = Object.keys(contentMap).map((o) => ({
	key: o,
	text: contentMap[o],
	value: o,
}));

const Home = ({ history }) => {
	const [player1, setPlayer1] = useState({ platform: 'xbl', gamertag: '' });
	const [player2, setPlayer2] = useState({ platform: 'xbl', gamertag: '' });

	console.log({ player1, player2 });

	return (
		<>
			<div
				style={{
					textAlign: 'center',
					height: '15%',
					background: '#f9fafb',
					padding: '3rem',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<Header as="h2">Johnny Se La Come</Header>
			</div>
			<Segment
				placeholder
				style={{ height: '65%', border: 'none', boxShadow: 'none' }}
			>
				<Grid columns={2} relaxed="very" stackable>
					<Grid.Column verticalAlign="middle" style={{ display: 'flex' }}>
						<Input
							size="big"
							label={
								<Dropdown
									defaultValue={options[0].value}
									value={player1.platform}
									options={options}
									onChange={(e, state) =>
										setPlayer1({
											...player1,
											platform: state.value,
										})
									}
								/>
							}
							labelPosition="left"
							placeholder="Gamertag"
							value={player1.gamertag}
							onChange={(e) =>
								setPlayer1({
									...player1,
									gamertag: e.target.value,
								})
							}
							style={{ width: '100%' }}
						/>
					</Grid.Column>

					<Grid.Column verticalAlign="middle" style={{ display: 'flex' }}>
						<Input
							size="big"
							label={
								<Dropdown
									defaultValue={options[0].value}
									value={player2.platform}
									options={options}
									onChange={(e, state) =>
										setPlayer2({
											...player2,
											platform: state.value,
										})
									}
								/>
							}
							labelPosition="left"
							placeholder="Gamertag"
							value={player2.gamertag}
							onChange={(e) =>
								setPlayer2({
									...player2,
									gamertag: e.target.value,
								})
							}
							style={{ width: '100%' }}
						/>
					</Grid.Column>
				</Grid>

				<Divider vertical>vs</Divider>
			</Segment>
			<div
				style={{
					textAlign: 'center',
					height: '20%',
					background: '#f9fafb',
					padding: '3rem',
				}}
			>
				<Button
					positive
					size="big"
					disabled={!player1.gamertag || !player2.gamertag}
					onClick={() => {
						history.push(
							`/compare/${player1.platform}/${player1.gamertag}/${player2.platform}/${player2.gamertag}`
						);
					}}
				>
					Compare Stats
				</Button>
			</div>
		</>
	);
};

export default Home;
