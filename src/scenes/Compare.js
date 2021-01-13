import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';

import {
	Button,
	Divider,
	Form,
	Grid,
	Segment,
	Header,
	Statistic,
	Progress,
} from 'semantic-ui-react';
import get from 'lodash.get';

import { poolMatches } from '../utils/rank';
import Loader from '../components/Loader';

const format = (num) => Math.round(num * 100) / 100;

const Compare = ({ match }) => {
	const { platform1, platform2, gamertag1, gamertag2 } = match.params;
	const [player1, setPlayer1] = useState();
	const [player2, setPlayer2] = useState();
	const [loading, setLoading] = useState(true);

	console.log(player1);
	console.log(player2);

	useEffect(() => {
		(async () => {
			const responses = await Promise.all(
				[
					`https://app.sbmmwarzone.com/player?username=${gamertag1}&platform=${platform1}`,
					`https://app.sbmmwarzone.com/player/match?username=${gamertag1}&platform=${platform1}`,
					`https://app.sbmmwarzone.com/player?username=${gamertag2}&platform=${platform2}`,
					`https://app.sbmmwarzone.com/player/match?username=${gamertag2}&platform=${platform2}`,
				]
					.map((url) => axios.get(url))
					.map((p) => p.catch((e) => e))
			);

			console.log(responses);

			if (responses[0] instanceof Error || responses[1] instanceof Error) {
				setPlayer1({ error: 'error loading player data 😢' });
			} else {
				const [{ data: player1Info }, { data: player1matches }] = responses;

				setPlayer1({
					...player1Info,
					matches: player1matches,
					matchRanks: poolMatches(player1matches),
				});
			}

			if (responses[2] instanceof Error || responses[3] instanceof Error) {
				setPlayer2({ error: 'error loading player data 😢' });
			} else {
				const [
					,
					,
					{ data: player2Info },
					{ data: player2matches },
				] = responses;

				setPlayer2({
					...player2Info,
					matches: player2matches,
					matchRanks: poolMatches(player2matches),
				});
			}

			setTimeout(() => {
				setLoading(false);
			}, 500);
		})();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<Segment placeholder style={{ height: '100%' }}>
			<Grid
				columns={2}
				relaxed="very"
				stackable
				style={{ textAlign: 'center' }}
			>
				<PlayerSection
					player={player1}
					gamertag={get(player1, 'data.uno', gamertag1)}
				/>
				<PlayerSection
					player={player2}
					gamertag={get(player2, 'data.uno', gamertag2)}
				/>
			</Grid>
			<Divider vertical>vs</Divider>
		</Segment>
	);
};

const PlayerSection = ({ player, gamertag }) => {
	return (
		<Grid.Column verticalAlign="middle">
			<Header size="huge" style={{ marginBottom: '2rem' }}>
				{gamertag}
			</Header>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					margin: '0 1rem',
					flexDirection: 'column',
				}}
			>
				{player.error && (
					<Header size="large" style={{ marginBottom: '2rem' }}>
						{player.error}
					</Header>
				)}
				{!player.error && (
					<>
						<Statistic.Group style={{ justifyContent: 'center' }}>
							<Statistic size="tiny">
								<Statistic.Value>
									{format(
										get(
											player,
											'data.lifetime.mode.br.properties.kdRatio',
											0
										)
									) || 'N/A'}
								</Statistic.Value>
								<Statistic.Label>K/D Ratio</Statistic.Label>
							</Statistic>
							<Statistic size="tiny">
								<Statistic.Value>
									<NumberFormat
										thousandSeparator={true}
										displayType="text"
										value={get(
											player,
											'data.lifetime.mode.br.properties.wins',
											'N/A'
										)}
									/>
								</Statistic.Value>
								<Statistic.Label>Wins</Statistic.Label>
							</Statistic>
							<Statistic size="tiny">
								<Statistic.Value>
									<NumberFormat
										thousandSeparator={true}
										displayType="text"
										value={get(
											player,
											'data.lifetime.mode.br.properties.kills',
											'N/A'
										)}
									/>
								</Statistic.Value>
								<Statistic.Label>Kills</Statistic.Label>
							</Statistic>
						</Statistic.Group>

						<Divider style={{ margin: '3rem 0' }} />

						<div>
							<Segment>
								<p>{`${player.matchRanks.bronze.matches.length} of ${player.matches.length} Bronze Ranked Matches`}</p>
								<Progress
									percent={player.matchRanks.bronze.percent}
									precision={2}
									progress
									active
									className="rank-bronze"
								/>

								<p>{`${player.matchRanks.silver.matches.length} of ${player.matches.length} Silver Ranked Matches`}</p>
								<Progress
									percent={player.matchRanks.silver.percent}
									precision={2}
									progress
									active
									className="rank-silver"
								/>

								<p>{`${player.matchRanks.gold.matches.length} of ${player.matches.length} Gold Ranked Matches`}</p>
								<Progress
									percent={player.matchRanks.gold.percent}
									precision={2}
									progress
									active
									className="rank-gold"
								/>

								<p>{`${player.matchRanks.diamond.matches.length} of ${player.matches.length} Diamond Ranked Matches`}</p>
								<Progress
									percent={player.matchRanks.diamond.percent}
									precision={2}
									progress
									active
									className="rank-diamond"
								/>
							</Segment>
						</div>
					</>
				)}
			</div>
		</Grid.Column>
	);
};

export default Compare;
