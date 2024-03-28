/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getDownloadDocumentAccess = /* GraphQL */ `query GetDownloadDocumentAccess($params: DownloadDocumentAccessInput) {
  getDownloadDocumentAccess(params: $params) {
    signedUrl
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDownloadDocumentAccessQueryVariables,
  APITypes.GetDownloadDocumentAccessQuery
>;
export const getUploadDocumentAccess = /* GraphQL */ `query GetUploadDocumentAccess($params: UploadDocumentAccessInput) {
  getUploadDocumentAccess(params: $params) {
    signedUrl
    metadataHeaders
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUploadDocumentAccessQueryVariables,
  APITypes.GetUploadDocumentAccessQuery
>;
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
      documentIndexes {
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
    documentIndexes {
      items {
        username
        key
        bucketName
        dirname
        filename
        entityType
        eTag
        extension
        mimetype
        size
        storageClass
        tags
        ttl
        version
        createdAt
        updatedAt
        userDocumentIndexesUsername
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
      documentIndexes {
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
      documentIndexes {
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
export const getDocumentIndex = /* GraphQL */ `query GetDocumentIndex($username: String!, $key: String!) {
  getDocumentIndex(username: $username, key: $key) {
    username
    key
    bucketName
    dirname
    filename
    entityType
    eTag
    extension
    mimetype
    size
    storageClass
    tags
    ttl
    version
    user {
      username
      email
      documentIndexes {
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
    userDocumentIndexesUsername
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDocumentIndexQueryVariables,
  APITypes.GetDocumentIndexQuery
>;
export const listDocumentIndexes = /* GraphQL */ `query ListDocumentIndexes(
  $username: String
  $key: ModelStringKeyConditionInput
  $filter: ModelDocumentIndexFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDocumentIndexes(
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
      bucketName
      dirname
      filename
      entityType
      eTag
      extension
      mimetype
      size
      storageClass
      tags
      ttl
      version
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
      userDocumentIndexesUsername
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDocumentIndexesQueryVariables,
  APITypes.ListDocumentIndexesQuery
>;
export const documentIndicesByKeyAndVersion = /* GraphQL */ `query DocumentIndicesByKeyAndVersion(
  $key: String!
  $version: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelDocumentIndexFilterInput
  $limit: Int
  $nextToken: String
) {
  documentIndicesByKeyAndVersion(
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
      bucketName
      dirname
      filename
      entityType
      eTag
      extension
      mimetype
      size
      storageClass
      tags
      ttl
      version
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
      userDocumentIndexesUsername
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.DocumentIndicesByKeyAndVersionQueryVariables,
  APITypes.DocumentIndicesByKeyAndVersionQuery
>;
