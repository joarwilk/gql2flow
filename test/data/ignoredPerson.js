// @flow
// graphql flow definitions
export type GraphQLResponseRoot = {
  data?: Root;
  errors?: Array<GraphQLResponseError>;
}

export type GraphQLResponseError = {
  message: string;            // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>;
  [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

export type GraphQLResponseErrorLocation = {
  line: number;
  column: number;
}

export type Root = {
  __typename: string;
  allFilms?: FilmsConnection;
  film?: Film;
  allPeople?: PeopleConnection;
  allPlanets?: PlanetsConnection;
  planet?: Planet;
  allSpecies?: SpeciesConnection;
  species?: Species;
  allStarships?: StarshipsConnection;
  starship?: Starship;
  allVehicles?: VehiclesConnection;
  vehicle?: Vehicle;
  /** Fetches an object given its ID */
  node?: Node;
}

/**
  description: A connection to a list of items.
*/
export type FilmsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<FilmsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  films?: Array<Film>;
}

/**
  description: Information about pagination in a connection.
*/
export type PageInfo = {
  __typename: string;
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean;
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: string;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: string;
}

/**
  description: An edge in a connection.
*/
export type FilmsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Film;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A single film.
*/
export type Film = {
  __typename: string;
  /** The title of this film. */
  title?: string;
  /** The episode number of this film. */
  episodeID?: number;
  /** The opening paragraphs at the beginning of this film. */
  openingCrawl?: string;
  /** The name of the director of this film. */
  director?: string;
  /** The name(s) of the producer(s) of this film. */
  producers?: Array<string>;
  /** The ISO 8601 date format of film release at original creator country. */
  releaseDate?: string;
  speciesConnection?: FilmSpeciesConnection;
  starshipConnection?: FilmStarshipsConnection;
  vehicleConnection?: FilmVehiclesConnection;
  characterConnection?: FilmCharactersConnection;
  planetConnection?: FilmPlanetsConnection;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: string;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: string;
  /** The ID of an object */
  id: string;
}

/**
  description: An object with an ID
*/
export type Node = Planet | Species | Starship | Vehicle | Film;

/**
  description: A large mass, planet or planetoid in the Star Wars Universe, at the time of
0 ABY.
*/
export type Planet = {
  __typename: string;
  /** The name of this planet. */
  name?: string;
  /** The diameter of this planet in kilometers. */
  diameter?: number;
  /** The number of standard hours it takes for this planet to complete a single
rotation on its axis. */
  rotationPeriod?: number;
  /** The number of standard days it takes for this planet to complete a single orbit
of its local star. */
  orbitalPeriod?: number;
  /** A number denoting the gravity of this planet, where "1" is normal or 1 standard
G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs. */
  gravity?: string;
  /** The average population of sentient beings inhabiting this planet. */
  population?: number;
  /** The climates of this planet. */
  climates?: Array<string>;
  /** The terrains of this planet. */
  terrains?: Array<string>;
  /** The percentage of the planet surface that is naturally occuring water or bodies
of water. */
  surfaceWater?: number;
  residentConnection?: PlanetResidentsConnection;
  filmConnection?: PlanetFilmsConnection;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: string;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: string;
  /** The ID of an object */
  id: string;
}

/**
  description: A connection to a list of items.
*/
export type PlanetResidentsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<PlanetResidentsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
}

/**
  description: An edge in a connection.
*/
export type PlanetResidentsEdge = {
  __typename: string;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type PersonFilmsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<PersonFilmsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  films?: Array<Film>;
}

/**
  description: An edge in a connection.
*/
export type PersonFilmsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Film;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A type of person or character within the Star Wars Universe.
*/
export type Species = {
  __typename: string;
  /** The name of this species. */
  name?: string;
  /** The classification of this species, such as "mammal" or "reptile". */
  classification?: string;
  /** The designation of this species, such as "sentient". */
  designation?: string;
  /** The average height of this species in centimeters. */
  averageHeight?: number;
  /** The average lifespan of this species in years. */
  averageLifespan?: number;
  /** Common eye colors for this species, null if this species does not typically
have eyes. */
  eyeColors?: Array<string>;
  /** Common hair colors for this species, null if this species does not typically
have hair. */
  hairColors?: Array<string>;
  /** Common skin colors for this species, null if this species does not typically
have skin. */
  skinColors?: Array<string>;
  /** The language commonly spoken by this species. */
  language?: string;
  /** A planet that this species originates from. */
  homeworld?: Planet;
  personConnection?: SpeciesPeopleConnection;
  filmConnection?: SpeciesFilmsConnection;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: string;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: string;
  /** The ID of an object */
  id: string;
}

/**
  description: A connection to a list of items.
*/
export type SpeciesPeopleConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<SpeciesPeopleEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
}

/**
  description: An edge in a connection.
*/
export type SpeciesPeopleEdge = {
  __typename: string;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type SpeciesFilmsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<SpeciesFilmsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  films?: Array<Film>;
}

/**
  description: An edge in a connection.
*/
export type SpeciesFilmsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Film;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type PersonStarshipsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<PersonStarshipsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  starships?: Array<Starship>;
}

/**
  description: An edge in a connection.
*/
export type PersonStarshipsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Starship;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A single transport craft that has hyperdrive capability.
*/
export type Starship = {
  __typename: string;
  /** The name of this starship. The common name, such as "Death Star". */
  name?: string;
  /** The model or official name of this starship. Such as "T-65 X-wing" or "DS-1
Orbital Battle Station". */
  model?: string;
  /** The class of this starship, such as "Starfighter" or "Deep Space Mobile
Battlestation" */
  starshipClass?: string;
  /** The manufacturers of this starship. */
  manufacturers?: Array<string>;
  /** The cost of this starship new, in galactic credits. */
  costInCredits?: number;
  /** The length of this starship in meters. */
  length?: number;
  /** The number of personnel needed to run or pilot this starship. */
  crew?: string;
  /** The number of non-essential people this starship can transport. */
  passengers?: string;
  /** The maximum speed of this starship in atmosphere. null if this starship is
incapable of atmosphering flight. */
  maxAtmospheringSpeed?: number;
  /** The class of this starships hyperdrive. */
  hyperdriveRating?: number;
  /** The Maximum number of Megalights this starship can travel in a standard hour.
A "Megalight" is a standard unit of distance and has never been defined before
within the Star Wars universe. This figure is only really useful for measuring
the difference in speed of starships. We can assume it is similar to AU, the
distance between our Sun (Sol) and Earth. */
  MGLT?: number;
  /** The maximum number of kilograms that this starship can transport. */
  cargoCapacity?: number;
  /** The maximum length of time that this starship can provide consumables for its
entire crew without having to resupply. */
  consumables?: string;
  pilotConnection?: StarshipPilotsConnection;
  filmConnection?: StarshipFilmsConnection;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: string;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: string;
  /** The ID of an object */
  id: string;
}

/**
  description: A connection to a list of items.
*/
export type StarshipPilotsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<StarshipPilotsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
}

/**
  description: An edge in a connection.
*/
export type StarshipPilotsEdge = {
  __typename: string;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type StarshipFilmsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<StarshipFilmsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  films?: Array<Film>;
}

/**
  description: An edge in a connection.
*/
export type StarshipFilmsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Film;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type PersonVehiclesConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<PersonVehiclesEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  vehicles?: Array<Vehicle>;
}

/**
  description: An edge in a connection.
*/
export type PersonVehiclesEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Vehicle;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A single transport craft that does not have hyperdrive capability
*/
export type Vehicle = {
  __typename: string;
  /** The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder
bike". */
  name?: string;
  /** The model or official name of this vehicle. Such as "All-Terrain Attack
Transport". */
  model?: string;
  /** The class of this vehicle, such as "Wheeled" or "Repulsorcraft". */
  vehicleClass?: string;
  /** The manufacturers of this vehicle. */
  manufacturers?: Array<string>;
  /** The cost of this vehicle new, in Galactic Credits. */
  costInCredits?: number;
  /** The length of this vehicle in meters. */
  length?: number;
  /** The number of personnel needed to run or pilot this vehicle. */
  crew?: string;
  /** The number of non-essential people this vehicle can transport. */
  passengers?: string;
  /** The maximum speed of this vehicle in atmosphere. */
  maxAtmospheringSpeed?: number;
  /** The maximum number of kilograms that this vehicle can transport. */
  cargoCapacity?: number;
  /** The maximum length of time that this vehicle can provide consumables for its
entire crew without having to resupply. */
  consumables?: string;
  pilotConnection?: VehiclePilotsConnection;
  filmConnection?: VehicleFilmsConnection;
  /** The ISO 8601 date format of the time that this resource was created. */
  created?: string;
  /** The ISO 8601 date format of the time that this resource was edited. */
  edited?: string;
  /** The ID of an object */
  id: string;
}

/**
  description: A connection to a list of items.
*/
export type VehiclePilotsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<VehiclePilotsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
}

/**
  description: An edge in a connection.
*/
export type VehiclePilotsEdge = {
  __typename: string;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type VehicleFilmsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<VehicleFilmsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  films?: Array<Film>;
}

/**
  description: An edge in a connection.
*/
export type VehicleFilmsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Film;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type PlanetFilmsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<PlanetFilmsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  films?: Array<Film>;
}

/**
  description: An edge in a connection.
*/
export type PlanetFilmsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Film;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type FilmSpeciesConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<FilmSpeciesEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  species?: Array<Species>;
}

/**
  description: An edge in a connection.
*/
export type FilmSpeciesEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Species;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type FilmStarshipsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<FilmStarshipsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  starships?: Array<Starship>;
}

/**
  description: An edge in a connection.
*/
export type FilmStarshipsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Starship;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type FilmVehiclesConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<FilmVehiclesEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  vehicles?: Array<Vehicle>;
}

/**
  description: An edge in a connection.
*/
export type FilmVehiclesEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Vehicle;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type FilmCharactersConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<FilmCharactersEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
}

/**
  description: An edge in a connection.
*/
export type FilmCharactersEdge = {
  __typename: string;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type FilmPlanetsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<FilmPlanetsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  planets?: Array<Planet>;
}

/**
  description: An edge in a connection.
*/
export type FilmPlanetsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Planet;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type PeopleConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<PeopleEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
}

/**
  description: An edge in a connection.
*/
export type PeopleEdge = {
  __typename: string;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type PlanetsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<PlanetsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  planets?: Array<Planet>;
}

/**
  description: An edge in a connection.
*/
export type PlanetsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Planet;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type SpeciesConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<SpeciesEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  species?: Array<Species>;
}

/**
  description: An edge in a connection.
*/
export type SpeciesEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Species;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type StarshipsConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<StarshipsEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  starships?: Array<Starship>;
}

/**
  description: An edge in a connection.
*/
export type StarshipsEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Starship;
  /** A cursor for use in pagination */
  cursor: string;
}

/**
  description: A connection to a list of items.
*/
export type VehiclesConnection = {
  __typename: string;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Information to aid in pagination. */
  edges?: Array<VehiclesEdge>;
  /** A count of the total number of objects in this connection, ignoring pagination.
This allows a client to fetch the first five objects by passing "5" as the
argument to "first", then fetch the total count so it could display "5 of 83",
for example. */
  totalCount?: number;
  /** A list of all of the objects returned in the connection. This is a convenience
field provided for quickly exploring the API; rather than querying for
"{ edges { node } }" when no edge data is needed, this field can be be used
instead. Note that when clients like Relay need to fetch the "cursor" field on
the edge to enable efficient pagination, this shortcut cannot be used, and the
full "{ edges { node } }" version should be used instead. */
  vehicles?: Array<Vehicle>;
}

/**
  description: An edge in a connection.
*/
export type VehiclesEdge = {
  __typename: string;
  /** The item at the end of the edge */
  node?: Vehicle;
  /** A cursor for use in pagination */
  cursor: string;
}
