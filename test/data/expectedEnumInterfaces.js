module.exports = `  export interface GraphQLResponseRoot {
    data?: IQuery;
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
  export interface IQuery {
    __typename: string;
    colorEnum: IColorEnum;
  }

  /*
    description: null
  */
  export type IColorEnum = "RED" | "GREEN" | "BLUE";`
