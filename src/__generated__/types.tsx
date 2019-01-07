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

export type CreateSessionVariables = {
  githubCode?: Maybe<string>;
};

export type CreateSessionMutation = {
  __typename?: "Mutation";

  createSession: Maybe<CreateSessionCreateSession>;
};

export type CreateSessionCreateSession = {
  __typename?: "UserSession";

  uuid: Maybe<string>;
};

export type GetCurrentUserVariables = {
  sessionId?: Maybe<string>;
};

export type GetCurrentUserQuery = {
  __typename?: "Query";

  currentUser: Maybe<GetCurrentUserCurrentUser>;
};

export type GetCurrentUserCurrentUser = {
  __typename?: "User";

  id: Maybe<number>;

  email: Maybe<string>;
};

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

export const CreateSessionDocument = gql`
  mutation CreateSession($githubCode: String) {
    createSession(githubCode: $githubCode) {
      uuid
    }
  }
`;
export class CreateSessionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateSessionMutation, CreateSessionVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateSessionMutation, CreateSessionVariables>
        mutation={CreateSessionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateSessionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateSessionMutation, CreateSessionVariables>
> &
  TChildProps;
export type CreateSessionMutationFn = ReactApollo.MutationFn<
  CreateSessionMutation,
  CreateSessionVariables
>;
export function CreateSessionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateSessionMutation,
        CreateSessionVariables,
        CreateSessionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateSessionMutation,
    CreateSessionVariables,
    CreateSessionProps<TChildProps>
  >(CreateSessionDocument, operationOptions);
}
export const GetCurrentUserDocument = gql`
  query GetCurrentUser($sessionId: String) {
    currentUser(sessionId: $sessionId) {
      id
      email
    }
  }
`;
export class GetCurrentUserComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetCurrentUserQuery, GetCurrentUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetCurrentUserQuery, GetCurrentUserVariables>
        query={GetCurrentUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCurrentUserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetCurrentUserQuery, GetCurrentUserVariables>
> &
  TChildProps;
export function GetCurrentUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCurrentUserQuery,
        GetCurrentUserVariables,
        GetCurrentUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetCurrentUserQuery,
    GetCurrentUserVariables,
    GetCurrentUserProps<TChildProps>
  >(GetCurrentUserDocument, operationOptions);
}
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
