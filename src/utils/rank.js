import get from 'lodash.get';

const ranks = [
	{ Name: 'Diamond 1', KD: 1.234 },
	{ Name: 'Diamond 2', KD: 1.204 },
	{ Name: 'Diamond 3', KD: 1.18 },
	{ Name: 'Diamond 4', KD: 1.159 },
	{ Name: 'Diamond 5', KD: 1.139 },
	{ Name: 'Gold 1', KD: 1.118 },
	{ Name: 'Gold 2', KD: 1.098 },
	{ Name: 'Gold 3', KD: 1.077 },
	{ Name: 'Gold 4', KD: 1.056 },
	{ Name: 'Gold 5', KD: 1.036 },
	{ Name: 'Silver 1', KD: 1.015 },
	{ Name: 'Silver 2', KD: 0.99 },
	{ Name: 'Silver 3', KD: 0.967 },
	{ Name: 'Silver 4', KD: 0.941 },
	{ Name: 'Silver 5', KD: 0.913 },
	{ Name: 'Bronze 1', KD: 0.879 },
	{ Name: 'Bronze 2', KD: 0.839 },
	{ Name: 'Bronze 3', KD: 0.79 },
	{ Name: 'Bronze 4', KD: 0.592 },
	{ Name: 'Bronze 5', KD: 0 },
];

export const getMatchRank = (kd) => {
	if (kd <= 0.879) {
		return 'Bronze';
	}

	if (kd > 0.879 && kd < 1.036) {
		return 'Silver';
	}

	if (kd >= 1.036 && kd <= 1.118) {
		return 'Gold';
	}

	if (kd > 1.118) {
		return 'Diamond';
	}
};

export const poolMatches = (matches) => {
	const pool = {
		bronze: {
			matches: [],
			percent: 0,
		},
		silver: {
			matches: [],
			percent: 0,
		},
		gold: {
			matches: [],
			percent: 0,
		},
		diamond: {
			matches: [],
			percent: 0,
		},
	};

	matches.forEach((match) => {
		const matchKd = get(match, 'matchStatData.playerAverage');
		const rank = getMatchRank(matchKd);

		if (rank === 'Bronze') {
			pool.bronze.matches.push(match);
		} else if (rank === 'Silver') {
			pool.silver.matches.push(match);
		} else if (rank === 'Gold') {
			pool.gold.matches.push(match);
		} else if (rank === 'Diamond') {
			pool.diamond.matches.push(match);
		}
	});

	Object.keys(pool).forEach((r) => {
		const percent = (pool[r].matches.length / matches.length) * 100;
		pool[r].percent = percent;
	});

	return pool;
};
