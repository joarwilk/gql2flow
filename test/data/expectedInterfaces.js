module.exports = `  export interface GraphQLResponseRoot {
    data?: IRoot;
    errors?: Array<GraphQLResponseError>;
  }

  export interface GraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<GraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  }

  export interface GraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /*
    description: null
  */
  export interface IRoot {
    __typename: string;
    allFilms: IFilmsConnection;
    film: IFilm;
    allPeople: IPeopleConnection;
    person: IPerson;
    allPlanets: IPlanetsConnection;
    planet: IPlanet;
    allSpecies: ISpeciesConnection;
    species: ISpecies;
    allStarships: IStarshipsConnection;
    starship: IStarship;
    allVehicles: IVehiclesConnection;
    vehicle: IVehicle;
    node: Node;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IFilmsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IFilmsEdge>;
    totalCount: any;
    films: Array<IFilm>;
  }

  /*
    description: Information about pagination in a connection.
  */
  export interface IPageInfo {
    __typename: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  }

  /*
    description: An edge in a connection.
  */
  export interface IFilmsEdge {
    __typename: string;
    node: IFilm;
    cursor: string;
  }

  /*
    description: A single film.
  */
  export interface IFilm {
    __typename: string;
    title: string;
    episodeID: any;
    openingCrawl: string;
    director: string;
    producers: Array<string>;
    releaseDate: string;
    speciesConnection: IFilmSpeciesConnection;
    starshipConnection: IFilmStarshipsConnection;
    vehicleConnection: IFilmVehiclesConnection;
    characterConnection: IFilmCharactersConnection;
    planetConnection: IFilmPlanetsConnection;
    created: string;
    edited: string;
    id: string;
  }

  /*
    description: An object with an ID
  */
  export type Node = IPlanet | ISpecies | IStarship | IVehicle | IPerson | IFilm;

  /*
    description: An object with an ID
  */
  export interface INode extends IPlanet, ISpecies, IStarship, IVehicle, IPerson, IFilm {
    __typename: string;
    id: string;
  }

  /*
    description: A large mass, planet or planetoid in the Star Wars Universe, at the time of
0 ABY.
  */
  export interface IPlanet {
    __typename: string;
    name: string;
    diameter: any;
    rotationPeriod: any;
    orbitalPeriod: any;
    gravity: string;
    population: any;
    climates: Array<string>;
    terrains: Array<string>;
    surfaceWater: number;
    residentConnection: IPlanetResidentsConnection;
    filmConnection: IPlanetFilmsConnection;
    created: string;
    edited: string;
    id: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IPlanetResidentsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IPlanetResidentsEdge>;
    totalCount: any;
    residents: Array<IPerson>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IPlanetResidentsEdge {
    __typename: string;
    node: IPerson;
    cursor: string;
  }

  /*
    description: An individual person or character within the Star Wars universe.
  */
  export interface IPerson {
    __typename: string;
    name: string;
    birthYear: string;
    eyeColor: string;
    gender: string;
    hairColor: string;
    height: any;
    mass: any;
    skinColor: string;
    homeworld: IPlanet;
    filmConnection: IPersonFilmsConnection;
    species: ISpecies;
    starshipConnection: IPersonStarshipsConnection;
    vehicleConnection: IPersonVehiclesConnection;
    created: string;
    edited: string;
    id: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IPersonFilmsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IPersonFilmsEdge>;
    totalCount: any;
    films: Array<IFilm>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IPersonFilmsEdge {
    __typename: string;
    node: IFilm;
    cursor: string;
  }

  /*
    description: A type of person or character within the Star Wars Universe.
  */
  export interface ISpecies {
    __typename: string;
    name: string;
    classification: string;
    designation: string;
    averageHeight: number;
    averageLifespan: any;
    eyeColors: Array<string>;
    hairColors: Array<string>;
    skinColors: Array<string>;
    language: string;
    homeworld: IPlanet;
    personConnection: ISpeciesPeopleConnection;
    filmConnection: ISpeciesFilmsConnection;
    created: string;
    edited: string;
    id: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface ISpeciesPeopleConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<ISpeciesPeopleEdge>;
    totalCount: any;
    people: Array<IPerson>;
  }

  /*
    description: An edge in a connection.
  */
  export interface ISpeciesPeopleEdge {
    __typename: string;
    node: IPerson;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface ISpeciesFilmsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<ISpeciesFilmsEdge>;
    totalCount: any;
    films: Array<IFilm>;
  }

  /*
    description: An edge in a connection.
  */
  export interface ISpeciesFilmsEdge {
    __typename: string;
    node: IFilm;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IPersonStarshipsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IPersonStarshipsEdge>;
    totalCount: any;
    starships: Array<IStarship>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IPersonStarshipsEdge {
    __typename: string;
    node: IStarship;
    cursor: string;
  }

  /*
    description: A single transport craft that has hyperdrive capability.
  */
  export interface IStarship {
    __typename: string;
    name: string;
    model: string;
    starshipClass: string;
    manufacturers: Array<string>;
    costInCredits: number;
    length: number;
    crew: string;
    passengers: string;
    maxAtmospheringSpeed: any;
    hyperdriveRating: number;
    MGLT: any;
    cargoCapacity: number;
    consumables: string;
    pilotConnection: IStarshipPilotsConnection;
    filmConnection: IStarshipFilmsConnection;
    created: string;
    edited: string;
    id: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IStarshipPilotsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IStarshipPilotsEdge>;
    totalCount: any;
    pilots: Array<IPerson>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IStarshipPilotsEdge {
    __typename: string;
    node: IPerson;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IStarshipFilmsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IStarshipFilmsEdge>;
    totalCount: any;
    films: Array<IFilm>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IStarshipFilmsEdge {
    __typename: string;
    node: IFilm;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IPersonVehiclesConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IPersonVehiclesEdge>;
    totalCount: any;
    vehicles: Array<IVehicle>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IPersonVehiclesEdge {
    __typename: string;
    node: IVehicle;
    cursor: string;
  }

  /*
    description: A single transport craft that does not have hyperdrive capability
  */
  export interface IVehicle {
    __typename: string;
    name: string;
    model: string;
    vehicleClass: string;
    manufacturers: Array<string>;
    costInCredits: any;
    length: number;
    crew: string;
    passengers: string;
    maxAtmospheringSpeed: any;
    cargoCapacity: any;
    consumables: string;
    pilotConnection: IVehiclePilotsConnection;
    filmConnection: IVehicleFilmsConnection;
    created: string;
    edited: string;
    id: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IVehiclePilotsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IVehiclePilotsEdge>;
    totalCount: any;
    pilots: Array<IPerson>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IVehiclePilotsEdge {
    __typename: string;
    node: IPerson;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IVehicleFilmsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IVehicleFilmsEdge>;
    totalCount: any;
    films: Array<IFilm>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IVehicleFilmsEdge {
    __typename: string;
    node: IFilm;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IPlanetFilmsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IPlanetFilmsEdge>;
    totalCount: any;
    films: Array<IFilm>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IPlanetFilmsEdge {
    __typename: string;
    node: IFilm;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IFilmSpeciesConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IFilmSpeciesEdge>;
    totalCount: any;
    species: Array<ISpecies>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IFilmSpeciesEdge {
    __typename: string;
    node: ISpecies;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IFilmStarshipsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IFilmStarshipsEdge>;
    totalCount: any;
    starships: Array<IStarship>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IFilmStarshipsEdge {
    __typename: string;
    node: IStarship;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IFilmVehiclesConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IFilmVehiclesEdge>;
    totalCount: any;
    vehicles: Array<IVehicle>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IFilmVehiclesEdge {
    __typename: string;
    node: IVehicle;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IFilmCharactersConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IFilmCharactersEdge>;
    totalCount: any;
    characters: Array<IPerson>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IFilmCharactersEdge {
    __typename: string;
    node: IPerson;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IFilmPlanetsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IFilmPlanetsEdge>;
    totalCount: any;
    planets: Array<IPlanet>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IFilmPlanetsEdge {
    __typename: string;
    node: IPlanet;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IPeopleConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IPeopleEdge>;
    totalCount: any;
    people: Array<IPerson>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IPeopleEdge {
    __typename: string;
    node: IPerson;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IPlanetsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IPlanetsEdge>;
    totalCount: any;
    planets: Array<IPlanet>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IPlanetsEdge {
    __typename: string;
    node: IPlanet;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface ISpeciesConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<ISpeciesEdge>;
    totalCount: any;
    species: Array<ISpecies>;
  }

  /*
    description: An edge in a connection.
  */
  export interface ISpeciesEdge {
    __typename: string;
    node: ISpecies;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IStarshipsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IStarshipsEdge>;
    totalCount: any;
    starships: Array<IStarship>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IStarshipsEdge {
    __typename: string;
    node: IStarship;
    cursor: string;
  }

  /*
    description: A connection to a list of items.
  */
  export interface IVehiclesConnection {
    __typename: string;
    pageInfo: IPageInfo;
    edges: Array<IVehiclesEdge>;
    totalCount: any;
    vehicles: Array<IVehicle>;
  }

  /*
    description: An edge in a connection.
  */
  export interface IVehiclesEdge {
    __typename: string;
    node: IVehicle;
    cursor: string;
  }`
