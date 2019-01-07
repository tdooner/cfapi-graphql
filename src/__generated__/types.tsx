export type Maybe<T> = T | null;

export enum BrigadeRegion {
  Northeast = "Northeast",
  Midwest = "Midwest",
  South = "South",
  West = "West"
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Documents
// ====================================================

export type ListBrigadesVariables = {};

export type ListBrigadesQuery = {
  __typename?: "Query";

  listBrigades: ListBrigadesListBrigades[];
};

export type ListBrigadesListBrigades = {
  __typename?: "Brigade";

  name: string;

  slug: string;

  website: Maybe<string>;

  city: Maybe<string>;

  state: Maybe<string>;

  region: Maybe<BrigadeRegion>;

  latitude: Maybe<number>;

  longitude: Maybe<number>;

  tags: string[];

  links: Maybe<ListBrigadesLinks>;

  last_updated: Maybe<number>;
};

export type ListBrigadesLinks = {
  __typename?: "BrigadeLinks";

  meetup: Maybe<string>;

  facebook: Maybe<string>;

  twitter: Maybe<string>;

  github: Maybe<string>;

  rss: Maybe<string>;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const ListBrigadesDocument = gql`
  query ListBrigades {
    listBrigades {
      name
      slug
      website
      city
      state
      region
      latitude
      longitude
      tags
      links {
        meetup
        facebook
        twitter
        github
        rss
      }
      last_updated
    }
  }
`;
export class ListBrigadesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ListBrigadesQuery, ListBrigadesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ListBrigadesQuery, ListBrigadesVariables>
        query={ListBrigadesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ListBrigadesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ListBrigadesQuery, ListBrigadesVariables>
> &
  TChildProps;
export function ListBrigadesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ListBrigadesQuery,
        ListBrigadesVariables,
        ListBrigadesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ListBrigadesQuery,
    ListBrigadesVariables,
    ListBrigadesProps<TChildProps>
  >(ListBrigadesDocument, operationOptions);
}
