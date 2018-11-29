// this is a work in progress.
const topActions = {
    "produce": {
        "coin-cost": 0,
        "special-cost": "produce",
        "workers": 0,
        "benefit-1": "producehexes-2/producehexes-3",
        "benefit-1-upgrades": 0,
        "base-benefit-2": null,
        "benefit-2-upgrades": 0,
        "related-structure-type": "mill",
        "has-structure": false,
        "structure-benefit": "special-mill",
        "bottom-coins": 2
    },
    "trade": {
        "coin-cost": 1,
        "special-cost": null,
        "workers": 0,
        "benefit-1": "anyresource-2",
        "benefit-1-upgrades": 0,
        "benefit-2": "popularity-1/popularity-2",
        "benefit-2-upgrades": 0,
        "related-structure-type": "armory",
        "has-structure": false,
        "structure-benefit": "power-1",
        "bottom-coins": 0
    },
    "bolster": {
        "coin-cost": 1,
        "special-cost": null,
        "workers": 0,
        "benefit-1": "power-2/power-3",
        "benefit-1-upgrades": 0,
        "benefit-2": "combatcard-1/combatcard-2",
        "benefit-2-upgrades": 0,
        "related-structure-type": "monument",
        "has-structure": false,
        "structure-benefit": "popularity-1",
        "bottom-coins": 3
    },
    "move": {
        "coin-cost": 0,
        "special-cost": false,
        "workers": 0,
        "benefit-1": "move-2/move-3",
        "benefit-1-upgrades": 0,
        "benefit-2": "coin-1/coin-2",
        "benefit-2-upgrades": 0,
        "related-structure-type": "mine",
        "has-structure": false,
        "structure-benefit": "special-mine",
        "bottom-coins": 1
    }
}

const boards = {
    "industrial": {
        "invaders": false,
        "rank": "1",
        "popularity": 2,
        "coins": 4,
        "upgrade-slots": "oil-2/oil-3",
        "upgrade-upgrades": 0,
        "upgrade-top": "bolster",
        "deploy-slots": "metal-1/metal-2/metal-3",
        "deploy-upgrades": 0,
        "deploy-top": "produce",
        "build-slots": "wood-2/wood-3",
        "build-upgrades": 0,
        "build-top": "move",
        "enlist-slots": "food-2/food-3/food-4",
        "enlist-upgrades": 0,
        "enlist-top": "trade"
    },
    "engineering": {
        "invaders": false,
        "rank": "2",
        "popularity": 2,
        "coins": 5,
        "upgrade-slots": "oil-2/oil-3",
        "upgrade-upgrades": 0,
        "upgrade-top": "produce",
        "deploy-slots": "metal-2/metal-3/metal-4",
        "deploy-upgrades": 0,
        "deploy-top": "trade",
        "build-slots": "wood-1/wood-2/wood-3",
        "build-upgrades": 0,
        "build-top": "bolster",
        "enlist-slots": "food-2/food-3",
        "enlist-upgrades": 0,
        "enlist-top": "move"
    },
    "militant": {
        "invaders": true,
        "rank": "2A",
        "popularity": 3,
        "coins": 4,
        "upgrade-slots": "oil-1/oil-2/oil-3",
        "upgrade-upgrades": 0,
        "upgrade-top": "bolster",
        "deploy-slots": "metal-2/metal-3",
        "deploy-upgrades": 0,
        "deploy-top": "move",
        "build-slots": "wood-3/wood-4",
        "build-upgrades": 0,
        "build-top": "produce",
        "enlist-slots": "food-1/food-2/food-3",
        "enlist-upgrades": 0,
        "enlist-top": "trade"
    },
    "patriotic": {
        "invaders": false,
        "rank": "3",
        "popularity": 2,
        "coins": 6,
        "upgrade-slots": "oil-2",
        "upgrade-upgrades": 0,
        "upgrade-top": "move",
        "deploy-slots": "metal-1/metal-2/metal-3/metal-4",
        "deploy-upgrades": 0,
        "deploy-top": "bolster",
        "build-slots": "wood-2/wood-3/wood-4",
        "build-upgrades": 0,
        "build-top": "trade",
        "enlist-slots": "food-2/food-3",
        "enlist-upgrades": 0,
        "enlist-top": "produce"
    },
    "innovative": {
        "invaders": true,
        "rank": "3A",
        "popularity": 3,
        "coins": 5,
        "upgrade-slots": "oil-3",
        "upgrade-upgrades": 0,
        "upgrade-top": "trade",
        "deploy-slots": "metal-2/metal-3",
        "deploy-upgrades": 0,
        "deploy-top": "produce",
        "build-slots": "wood-1/wood-2/wood-3/wood-4",
        "build-upgrades": 0,
        "build-top": "bolster",
        "enlist-slots": "food-1/food-2/food-3",
        "enlist-upgrades": 0,
        "enlist-top": "move"
    },
    "mechanical": {
        "invaders": false,
        "rank": "4",
        "popularity": 3,
        "coins": 6,
        "upgrade-slots": "oil-2/oil-3",
        "upgrade-upgrades": 0,
        "upgrade-top": "trade",
        "deploy-slots": "metal-1/metal-2/metal-3",
        "deploy-upgrades": 0,
        "deploy-top": "bolster",
        "build-slots": "wood-2/wood-3",
        "build-upgrades": 0,
        "build-top": "move",
        "enlist-slots": "food-2/food-3/food-4",
        "enlist-upgrades": 0,
        "enlist-top": "produce"
    },
    "agricultural": {
        "invaders": false,
        "rank": "5",
        "popularity": 4,
        "coins": 7,
        "upgrade-slots": "oil-2",
        "upgrade-upgrades": 0,
        "upgrade-top": "move",
        "deploy-slots": "metal-2/metal-3/metal-4",
        "deploy-upgrades": 0,
        "deploy-top": "trade",
        "build-slots": "wood-2/wood-3/wood-4",
        "build-upgrades": 0,
        "build-top": "produce",
        "enlist-slots": "food-1/food-2/food-3",
        "enlist-upgrades": 0,
        "enlist-top": "bolster"
    }
}

// in most cases, the bottom actions are the same for each top action.
// bottom coins are deviant for mechanical, innovative, and militant, and we need to overwrite those.
const getTopActions = (boardName) => {
    const baseTopActions = JSON.parse(JSON.stringify(topActions));

    if (!['mechanical', 'innovative', 'militant'].includes(boardName)) return baseTopActions;

    if (boardName === 'mechanical') {
        baseTopActions['produce']['bottom-coins'] = 2;
        baseTopActions['trade']['bottom-coins'] = 0;
        baseTopActions['bolster']['bottom-coins'] = 2;
        baseTopActions['move']['bottom-coins'] = 2;

        return baseTopActions;
    }

    if (boardName === 'militant') {
        baseTopActions['produce']['bottom-coins'] = 1;
        baseTopActions['trade']['bottom-coins'] = 2;
        baseTopActions['bolster']['bottom-coins'] = 0;
        baseTopActions['move']['bottom-coins'] = 3;

        return baseTopActions;
    }

    if (boardName === 'innovative') {
        baseTopActions['produce']['bottom-coins'] = 1;
        baseTopActions['trade']['bottom-coins'] = 3;
        baseTopActions['bolster']['bottom-coins'] = 2;
        baseTopActions['move']['bottom-coins'] = 0;

        return baseTopActions;
    }

    throw new Error("Invalid board name.");
}

const getActionBoards = () => {
    const boards2 = JSON.parse(JSON.stringify(boards));

    Object.keys(boards2).forEach((boardName) => {
        boards2[boardName]['topActions'] = getTopActions(boardName);
    });

    return boards2;
};


export { getActionBoards };

