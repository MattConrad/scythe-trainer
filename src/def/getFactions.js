const factions = [
    {
        "name": "Albion",
        "power:": 0,
        "combat cards": 0,
        "special": "You can plant a flag on the hex your avatar has just moved to.",
        "mechs": [
            { "name": "underriver(?)", "desc": "cross rivers to/from tunnels" },
            { "name": "sword(?)", "desc": "something something +/- 2" },
            { "name": "shield(?)", "desc": "something else +/- 2" },
            { "name": "rally", "desc": "move to workers or flags" }
        ]
    },
    {
        "name": "Nordic",
        "power:": 4,
        "combat cards": 1,
        "special": "Your workers may swim across rivers.",
        "mechs": [
            { "name": "riverwalk", "desc": "wood/metal" },
            { "name": "seaworthy", "desc": "move to/from lakes, and retreat to lakes when losing" },
            { "name": "artillery", "desc": "before combat, pay 1 power to decrease opponent power by 2" },
            { "name": "speed", "desc": "+1 speed" }
        ]
    },
    {
        "name": "Polania",
        "power:": 2,
        "combat cards": 3,
        "special": "Pick up to two options per encounter card.",
        "mechs": [
            { "name": "riverwalk", "desc": "village/metal" },
            { "name": "submerge", "desc": "move to/from lakes and from one lake to another" },
            { "name": "camraderie", "desc": "lose no popularity if you have a combat that makes oppponents workers retreat" },
            { "name": "speed", "desc": "+1 speed" }
        ]
    },
    {
        "name": "Rusviet",
        "power:": 3,
        "combat cards": 2,
        "special": "You may choose the same action on your production board on successive turns.",
        "mechs": [
            { "name": "riverwalk", "desc": "food/village" },
            { "name": "township", "desc": "move between a village you control and the Factory" },
            { "name": "people's army", "desc": "in combat where you have at least one worker, you may play an extra combat card" },
            { "name": "speed", "desc": "+1 speed" }
        ]
    },
    {
        "name": "Saxony",
        "power:": 1,
        "combat cards": 4,
        "special": "There is no limit to the stars you can gain from combat or from objective cards.",
        "mechs": [
            { "name": "riverwalk", "desc": "wood/metal" },
            { "name": "underpass", "desc": "move between any mountain you control and any tunnel" },
            { "name": "disarm", "desc": "before combat on a territory with a tunnel, opponent gets -2 power" },
            { "name": "speed", "desc": "+1 speed" }
        ]
    },
    {
        "name": "Togawa",
        "power:": 0,
        "combat cards": 0,
        "special": "You can lay a trap on the hex your avatar has just moved to.",
        "mechs": [
            { "name": "riverthing(?)", "desc": "" },
            { "name": "lakefight(?)", "desc": "Move on lakes and get some kind of combat bonus on lakes." },
            { "name": "shinobi", "desc": "Move to traps you've set." },
            { "name": "solitary(?)", "desc": "Get a combat bonus for combats where you have only one unit." }
        ]
    },
    {
        "name": "Crimea",
        "power:": 5,
        "combat cards": 0,
        "special": "You may use a combat card as one resource of your choice once per turn.",
        "mechs": [
            { "name": "riverwalk", "desc": "food/oil" },
            { "name": "wayfare", "desc": "Move from your territory or a home base to any inactive faction's home base or your own home base." },
            { "name": "scount", "desc": "Before combat steal one of your opponent's combat cards at random." },
            { "name": "speed", "desc": "+1 speed" }
        ]
    }
];

const getFactions = (hexes) => {
    const factions2 = JSON.parse(JSON.stringify(factions));

    return factions2
        .map(f => {
            const startHexId = hexes.filter(h => h.faction === f.name)[0].startHexId;
            f['startHexId'] = startHexId;

            return f;
        });
}

export { getFactions };