import json

class faction_names:
    TOGAWA = 'togawa'
    CRIMEA = 'crimea'
    SAXONY = 'saxony'
    POLANIA = 'polania'
    NORDIC = 'nordic'
    RUSVIET = 'rusviet'
    ALBION = 'albion'

class hex_types:
    NONE = 'none'
    FACTORY = 'factory'
    BASE = 'base'
    LAKE = 'lake'
    VILLAGE = 'village'
    METAL = 'metal'
    WOOD = 'wood'
    OIL = 'oil'
    FOOD = 'food'

class Hex:
    def __init__(self, id, x, y):
        self.id = id
        self.coordinates = (x, y)
        self.type = hex_types.NONE
        self.tunnel = False
        self.faction = None
        #self.faction_active = False

    def __str__(self):
        return str(vars(self))

    __repr__ = __str__

class Edge:
    @staticmethod
    def edge_key(hex1, hex2):
        if hex1.id < hex2.id:
             return f'{hex1.id}-{hex2.id}'
        else:
            return f'{hex2.id}-{hex1.id}'

    def __init__(self, hex1, hex2, is_river):
        #self.key = Edge.edge_key(hex1, hex2)
        self.ids = [hex1.id, hex2.id]
        self.coordinates = [hex1.coordinates, hex2.coordinates]
        self.river = is_river

ids_factory = {33}
ids_lake = {15,17,26,32,41,43,54}
ids_village = {10,13,28,31,42,46,47,57,63}
ids_metal = {8,19,24,34,36,45,50,56}
ids_wood = {11,23,25,27,37,38,49}
ids_oil = {12,16,18,35,40,48,51,53}
ids_food = {9,20,21,30,39,55,58}
base_to_faction = { 1: faction_names.ALBION, 4: faction_names.NORDIC, 22: faction_names.POLANIA, 
    29: faction_names.RUSVIET, 52: faction_names.SAXONY, 59: faction_names.TOGAWA, 62: faction_names.CRIMEA }
ids_tunnel = {18,24,27,39,42,48}

# generate hex grid using "even-r" coordinate system
# see https://www.redblobgames.com/grids/hexagons/#coordinates
hexes = []
id = 0
for i in range(9):
    colcount = 7 if i % 2 == 0 else 8
    for j in range(colcount):
        h = Hex(id, j, i)
        if id in ids_factory:
            h.type = hex_types.FACTORY
        elif id in ids_lake:
            h.type = hex_types.LAKE
        elif id in ids_village:
            h.type = hex_types.VILLAGE
        elif id in ids_metal:
            h.type = hex_types.METAL
        elif id in ids_wood:
            h.type = hex_types.WOOD
        elif id in ids_oil:
            h.type = hex_types.OIL
        elif id in ids_food:
            h.type = hex_types.FOOD
        
        if id in base_to_faction:
            h.type = hex_types.BASE
            h.faction = base_to_faction[id]
        
        if id in ids_tunnel:
            h.tunnel = True
        
        hexes.append(h)
        id += 1

# get all the nearby hexes, excluding those of type 'none'
def get_nearby_hexes(h, all_hexes):
    x, y = h.coordinates[0], h.coordinates[1]
    near_coords = []
    # east and west
    near_coords.append((x - 1, y))
    near_coords.append((x + 1, y))
    # offset for diagonals varies depending on starting hex row
    offset = 1 if h.coordinates[1] % 2 == 0 else -1
    # diagonals (ne, se etc)
    near_coords.append((x, y - 1))
    near_coords.append((x, y + 1))
    near_coords.append((x + offset, y - 1))
    near_coords.append((x + offset, y + 1))

    return [x for x in all_hexes if x.type != hex_types.NONE and x.coordinates in near_coords]

rivers = set(['10-11', '10-18', '11-18', '12-13', '18-19', '19-20', '19-27', '20-27', '20-28', 
    '21-28', '21-29', '23-24', '24-31', '27-28', '27-35', '30-37', '30-38', '31-38', '31-39',
    '34-35', '35-42', '37-45', '38-45', '38-46', '39-46', '46-47', '47-55', '48-55', '48-56',
    '49-56', '56-57'])

# edges are stored in a dictionary with key/edge. key is h1.id-h2.id, with h1 being the lowest id of the 2.
edges = {}
id = 0
for h in hexes:
    if h.type == hex_types.NONE:
        continue
    nearbys = get_nearby_hexes(h, hexes)

    if not nearbys:
        print(h)
        continue

    for nh in nearbys:
        key = Edge.edge_key(h, nh)
        if key in edges:
            continue
        is_river = (key in rivers)
        edges[key] = Edge(h, nh, is_river)

# a thing i gotta do, apparently.
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Hex):
            return obj.__dict__
        elif isinstance(obj, Edge):
            return obj.__dict__
        return json.JSONEncoder.default

#print(vars(edges['11-18']))
with open(r'./hexes.json', 'w') as hf:
    json.dump(hexes, hf, indent=4, cls=CustomJSONEncoder)

#edges_values = list(edges.values())
with open(r'./edges.json', 'w') as ef:
    json.dump(edges, ef, indent=4, cls=CustomJSONEncoder)
