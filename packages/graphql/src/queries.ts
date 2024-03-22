/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    id
    username
    title
    message
    read
    user {
      username
      email
      document {
        items {
          username
          key
          version
          filename
          extension
          dirname
          size
          ttl
          type
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          userDocumentUsername
          __typename
        }
        nextToken
        __typename
      }
      profile {
        username
        bio
        user {
          username
          email
          document {
            nextToken
            __typename
          }
          profile {
            username
            bio
            createdAt
            updatedAt
            __typename
          }
          notifications {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          userProfileUsername
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      notifications {
        items {
          id
          username
          title
          message
          read
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          userNotificationsUsername
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userProfileUsername
      __typename
    }
    createdAt
    updatedAt
    userNotificationsUsername
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      title
      message
      read
      user {
        username
        email
        document {
          items {
            username
            key
            version
            filename
            extension
            dirname
            size
            ttl
            type
            createdAt
            updatedAt
            userDocumentUsername
            __typename
          }
          nextToken
          __typename
        }
        profile {
          username
          bio
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notifications {
          items {
            id
            username
            title
            message
            read
            createdAt
            updatedAt
            userNotificationsUsername
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userProfileUsername
        __typename
      }
      createdAt
      updatedAt
      userNotificationsUsername
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const getTransfer = /* GraphQL */ `query GetTransfer($id: ID!) {
  getTransfer(id: $id) {
    id
    from
    to
    amount
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTransferQueryVariables,
  APITypes.GetTransferQuery
>;
export const listTransfers = /* GraphQL */ `query ListTransfers(
  $filter: ModelTransferFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransfers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      from
      to
      amount
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTransfersQueryVariables,
  APITypes.ListTransfersQuery
>;
export const getUser = /* GraphQL */ `query GetUser($username: String!) {
  getUser(username: $username) {
    username
    email
    document {
      items {
        username
        key
        version
        filename
        extension
        dirname
        size
        ttl
        type
        user {
          username
          email
          document {
            nextToken
            __typename
          }
          profile {
            username
            bio
            createdAt
            updatedAt
            __typename
          }
          notifications {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          userProfileUsername
          __typename
        }
        createdAt
        updatedAt
        userDocumentUsername
        __typename
      }
      nextToken
      __typename
    }
    profile {
      username
      bio
      user {
        username
        email
        document {
          items {
            username
            key
            version
            filename
            extension
            dirname
            size
            ttl
            type
            createdAt
            updatedAt
            userDocumentUsername
            __typename
          }
          nextToken
          __typename
        }
        profile {
          username
          bio
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notifications {
          items {
            id
            username
            title
            message
            read
            createdAt
            updatedAt
            userNotificationsUsername
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userProfileUsername
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    notifications {
      items {
        id
        username
        title
        message
        read
        user {
          username
          email
          document {
            nextToken
            __typename
          }
          profile {
            username
            bio
            createdAt
            updatedAt
            __typename
          }
          notifications {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          userProfileUsername
          __typename
        }
        createdAt
        updatedAt
        userNotificationsUsername
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    userProfileUsername
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $username: String
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    username: $username
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      username
      email
      document {
        items {
          username
          key
          version
          filename
          extension
          dirname
          size
          ttl
          type
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          userDocumentUsername
          __typename
        }
        nextToken
        __typename
      }
      profile {
        username
        bio
        user {
          username
          email
          document {
            nextToken
            __typename
          }
          profile {
            username
            bio
            createdAt
            updatedAt
            __typename
          }
          notifications {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          userProfileUsername
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      notifications {
        items {
          id
          username
          title
          message
          read
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          userNotificationsUsername
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userProfileUsername
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getProfile = /* GraphQL */ `query GetProfile($username: String!) {
  getProfile(username: $username) {
    username
    bio
    user {
      username
      email
      document {
        items {
          username
          key
          version
          filename
          extension
          dirname
          size
          ttl
          type
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          userDocumentUsername
          __typename
        }
        nextToken
        __typename
      }
      profile {
        username
        bio
        user {
          username
          email
          document {
            nextToken
            __typename
          }
          profile {
            username
            bio
            createdAt
            updatedAt
            __typename
          }
          notifications {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          userProfileUsername
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      notifications {
        items {
          id
          username
          title
          message
          read
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          userNotificationsUsername
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userProfileUsername
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProfileQueryVariables,
  APITypes.GetProfileQuery
>;
export const listProfiles = /* GraphQL */ `query ListProfiles(
  $username: String
  $filter: ModelProfileFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listProfiles(
    username: $username
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      username
      bio
      user {
        username
        email
        document {
          items {
            username
            key
            version
            filename
            extension
            dirname
            size
            ttl
            type
            createdAt
            updatedAt
            userDocumentUsername
            __typename
          }
          nextToken
          __typename
        }
        profile {
          username
          bio
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notifications {
          items {
            id
            username
            title
            message
            read
            createdAt
            updatedAt
            userNotificationsUsername
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userProfileUsername
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProfilesQueryVariables,
  APITypes.ListProfilesQuery
>;
export const getDocument = /* GraphQL */ `query GetDocument($username: String!, $key: String!) {
  getDocument(username: $username, key: $key) {
    username
    key
    version
    filename
    extension
    dirname
    size
    ttl
    type
    user {
      username
      email
      document {
        items {
          username
          key
          version
          filename
          extension
          dirname
          size
          ttl
          type
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          userDocumentUsername
          __typename
        }
        nextToken
        __typename
      }
      profile {
        username
        bio
        user {
          username
          email
          document {
            nextToken
            __typename
          }
          profile {
            username
            bio
            createdAt
            updatedAt
            __typename
          }
          notifications {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          userProfileUsername
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      notifications {
        items {
          id
          username
          title
          message
          read
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          userNotificationsUsername
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userProfileUsername
      __typename
    }
    createdAt
    updatedAt
    userDocumentUsername
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDocumentQueryVariables,
  APITypes.GetDocumentQuery
>;
export const listDocuments = /* GraphQL */ `query ListDocuments(
  $username: String
  $key: ModelStringKeyConditionInput
  $filter: ModelDocumentFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDocuments(
    username: $username
    key: $key
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      username
      key
      version
      filename
      extension
      dirname
      size
      ttl
      type
      user {
        username
        email
        document {
          items {
            username
            key
            version
            filename
            extension
            dirname
            size
            ttl
            type
            createdAt
            updatedAt
            userDocumentUsername
            __typename
          }
          nextToken
          __typename
        }
        profile {
          username
          bio
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notifications {
          items {
            id
            username
            title
            message
            read
            createdAt
            updatedAt
            userNotificationsUsername
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userProfileUsername
        __typename
      }
      createdAt
      updatedAt
      userDocumentUsername
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDocumentsQueryVariables,
  APITypes.ListDocumentsQuery
>;
export const documentsByKeyAndVersion = /* GraphQL */ `query DocumentsByKeyAndVersion(
  $key: String!
  $version: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelDocumentFilterInput
  $limit: Int
  $nextToken: String
) {
  documentsByKeyAndVersion(
    key: $key
    version: $version
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      username
      key
      version
      filename
      extension
      dirname
      size
      ttl
      type
      user {
        username
        email
        document {
          items {
            username
            key
            version
            filename
            extension
            dirname
            size
            ttl
            type
            createdAt
            updatedAt
            userDocumentUsername
            __typename
          }
          nextToken
          __typename
        }
        profile {
          username
          bio
          user {
            username
            email
            createdAt
            updatedAt
            userProfileUsername
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        notifications {
          items {
            id
            username
            title
            message
            read
            createdAt
            updatedAt
            userNotificationsUsername
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userProfileUsername
        __typename
      }
      createdAt
      updatedAt
      userDocumentUsername
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.DocumentsByKeyAndVersionQueryVariables,
  APITypes.DocumentsByKeyAndVersionQuery
>;
