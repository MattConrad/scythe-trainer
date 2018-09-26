import { React } from 'react';
import hexes from '../def/hexes'
import edges from '../def/edges'

const bases = hexes.filter(h => h.type == 'base');
const bases_with_edges = bases.map(b => {
    e = edges.filter(e => e.ids.includes(b.id));
    return { base, edgePair };
});
const bases_with_neighbors = bases_with_edges.map(bwe => {
    neighborIds = bwe.edgePair.map(e => e.ids);
    neighbors = hexes.filter(h => h.id != bwe.base.id && neighborIds.includes(h.id));
    return { base, neighbors };
});

class FactionChooser extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}