import React, { Component } from 'react';

class ChooseGameStart extends Component {

    constructor(props) {
        super(props);

        this.invadersCheckRef = React.createRef();
        this.factionSelectRef = React.createRef();
        this.actionBoardSelectRef = React.createRef();

        this.state = { showInvaders: false, factionName: "Nordic", actionBoardName: "industrial" }
    }

    getActionBoardSelect = (actionBoards) => {
        return (<select ref={this.actionBoardSelectRef} value={this.state.actionBoardName} onChange={this.handleActionChange} >
            {Object.keys(actionBoards)
                .filter(name => !actionBoards[name].invaders || this.state.showInvaders)
                .map(name => <option key={name} value={name}>{name} {actionBoards[name].rank}</option>)
            }
        </select>);
    }

    getActionBoardSummary = (actionBoardName, actionBoards) => {
        const board = actionBoards[actionBoardName];
        const baseActions = ['upgrade', 'deploy', 'build', 'enlist'];
        const summary = {};

        baseActions.forEach(actionName => {
            const top = board[actionName + '-top'];
            const slots = board[actionName + '-slots'];
            const topAction = board.topActions[board[actionName + "-top"]];

            const details = { top, slots, topAction, coins: topAction['bottom-coins'] };

            summary[actionName] = details;
        });

        console.log(summary);

        return (<table style={{ margin: "auto" }} >
            <thead>
                <tr>
                    <th>Top Action</th>
                    <th>Bottom Action</th>
                    <th>Bottom Slots</th>
                    <th>Bottom Coins</th>
                </tr>
            </thead>
            <tbody>
                {baseActions.map(actionName =>
                    <tr key={actionName}>
                        <td>{summary[actionName]["top"]}</td>
                        <td>{actionName}</td>
                        <td>{summary[actionName]["slots"]}</td>
                        <td>{summary[actionName]["coins"]}</td>
                    </tr>
                )}
            </tbody>
        </table>);

        // return (<div>
        //     {baseActions.map(actionName => <div>{summary[actionName]["top"]}/{actionName}/{summary[actionName]["slots"]}/{summary[actionName]["coins"]}</div>)

        //     }
        // </div>);
    }

    getFactionSelect = (factions) => {
        return (<select ref={this.factionSelectRef} value={this.state.factionName} onChange={this.handleFactionChange} >
            {Object.keys(factions)
                .filter(name => !factions[name].invaders || this.state.showInvaders)
                .map(name => <option key={name}>{name}</option>)
            }
        </select>);
    }

    getStartingResources = (factionName, hexMap) => {
        const startingHex = hexMap.filter(h => h.type === "base" && h.faction === factionName)[0];
        const ntypes = startingHex.neighbors
            .filter(n => !n.edge.river && n.adj.type !== "lake")
            .map(n => n.adj.type);
        return ntypes.join(', ');
    }

    handleActionChange = (e) => {
        this.setState({ actionBoardName: e.target.value });
    }

    handleCheckChange = (e) => {
        //MWCTODO: handle scenario where unchecking "disappears" the current selections.
        this.setState({ showInvaders: e.target.checked });
    }

    handleFactionChange = (e) => {
        this.setState({ factionName: e.target.value });
    }

    render() {
        //eventually, we want a checkbox to turn invaders off/on
        //eventually, state.faction must get lifted up.
        //hmm, maybe we could turn this stateless again. well.
        return (
            <div>
                <div>Use Invaders from Afar: <input type="checkbox" onChange={this.handleCheckChange} checked={this.state.showInvaders} /></div>
                <br />
                <div>Choose a Faction: {this.getFactionSelect(this.props.factions)}</div>
                <div>(starting resources: {this.getStartingResources(this.state.factionName, this.props.hexMap)})</div>
                <br />
                <div>Choose an Action Board: {this.getActionBoardSelect(this.props.actionBoards)}</div>
                <br />
                <div>{this.getActionBoardSummary(this.state.actionBoardName, this.props.actionBoards)}</div>
            </div >
        );
    }
}

export { ChooseGameStart };
