import get from 'lodash.get';

export const getMatchRank = (kd) => {
	if (kd <= 0.913) {
		return 'Bronze';
	}

	if (kd > 0.913 && kd < 1.036) {
		return 'Silver';
	}

	if (kd >= 1.036 && kd <= 1.139) {
		return 'Gold';
	}

	if (kd > 1.139) {
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
		const matchKd = get(match, 'matchStatData.teamMedian'); // get(match, 'matchStatData.playerAverage');
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
