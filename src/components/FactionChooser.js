import React, { Component } from 'react';

class FactionChooser extends Component {

    constructor(props) {
        super(props);

        this.checkRef = React.createRef();
        this.selectRef = React.createRef();

        this.state = { showInvaders: false, factionName: "Nordic" }
    }

    getFactionSelect = (factions) => {
        return (<select ref={this.selectRef} value={this.state.factionName} onChange={this.handleSelectChange} >
            {Object.keys(factions).map(name => <option key={name}>{name}</option>)}
        </select>);
    }

    getStartingResources = (factionName, hexMap) => {
        const startingHex = hexMap.filter(h => h.type === "base" && h.faction === factionName)[0];
        const ntypes = startingHex.neighbors
            .filter(n => !n.edge.river && n.adj.type !== "lake")
            .map(n => n.adj.type);
        return ntypes.join(', ');
    }

    handleSelectChange = (e) => {
        this.setState({ factionName: e.target.value });
    }

    render() {
        //eventually, we want a checkbox to turn invaders off/on
        //eventually, state.faction must get lifted up.
        //hmm, maybe we could turn this stateless again. well.
        return (
            <div>
                <div>Choose a Faction: {this.getFactionSelect(this.props.factions)}</div>
                <div>(starting resources: {this.getStartingResources(this.state.factionName, this.props.hexMap)})</div>
            </div>
        );
    }
}

// const getFactionSelect = (factionSelectRef, factions) => {
//     return (<select ref={factionSelectRef} >
//         {Object.keys(factions).map(name => <option>{name}</option>)}
//     </select>);
// }

// const FactionChooser = (props) => {
//     const factionSelectRef = React.createRef();

//     //eventually, we want a checkbox to turn invaders off/on
//     return (<div>
//         Choose a Faction: {getFactionSelect(factionSelectRef, props.factions)}
//     </div>);
// }

export { FactionChooser };
