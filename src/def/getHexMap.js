import hexes from './hexes'
import edges from './edges'

// each hex gets an array of neighbors (adjoining hexes)
// a neighbor is a { edge, hex } tuple.
const getHexMap = () => {
    //MWCTODO: if all we ever do with the edge keys is throw them away, we can rewrite edges.json instead.
    const hexes2 = JSON.parse(JSON.stringify(hexes));
    const edges2 = JSON.parse(JSON.stringify(Object.keys(edges).map(k => edges[k])));

    return hexes2.map(selfHex => {
        const selfEdges = edges2.filter(e => e.ids.includes(selfHex.id));
        const neighbors = selfEdges.map(selfEdge => {
            // each edge contains 2 ids, we want the adj one, not the self one.
            const adjId = selfEdge.ids.filter(id => id !== selfHex.id)[0];
            const adj = hexes2.filter(h => h.id === adjId)[0];

            return { edge: selfEdge, adj };
        });

        selfHex['neighbors'] = neighbors;

        return selfHex;
    });
}

export { getHexMap };
