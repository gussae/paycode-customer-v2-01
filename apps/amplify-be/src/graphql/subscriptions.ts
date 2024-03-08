/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $username: String
) {
  onCreateUser(filter: $filter, username: $username) {
    username
    email
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $username: String
) {
  onUpdateUser(filter: $filter, username: $username) {
    username
    email
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $username: String
) {
  onDeleteUser(filter: $filter, username: $username) {
    username
    email
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateProfile = /* GraphQL */ `subscription OnCreateProfile(
  $filter: ModelSubscriptionProfileFilterInput
  $username: String
) {
  onCreateProfile(filter: $filter, username: $username) {
    username
    bio
    user {
      username
      email
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
` as GeneratedSubscription<
  APITypes.OnCreateProfileSubscriptionVariables,
  APITypes.OnCreateProfileSubscription
>;
export const onUpdateProfile = /* GraphQL */ `subscription OnUpdateProfile(
  $filter: ModelSubscriptionProfileFilterInput
  $username: String
) {
  onUpdateProfile(filter: $filter, username: $username) {
    username
    bio
    user {
      username
      email
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
` as GeneratedSubscription<
  APITypes.OnUpdateProfileSubscriptionVariables,
  APITypes.OnUpdateProfileSubscription
>;
export const onDeleteProfile = /* GraphQL */ `subscription OnDeleteProfile(
  $filter: ModelSubscriptionProfileFilterInput
  $username: String
) {
  onDeleteProfile(filter: $filter, username: $username) {
    username
    bio
    user {
      username
      email
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
` as GeneratedSubscription<
  APITypes.OnDeleteProfileSubscriptionVariables,
  APITypes.OnDeleteProfileSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $username: String
) {
  onCreateNotification(filter: $filter, username: $username) {
    id
    username
    title
    message
    read
    user {
      username
      email
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
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $username: String
) {
  onUpdateNotification(filter: $filter, username: $username) {
    id
    username
    title
    message
    read
    user {
      username
      email
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
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
  $username: String
) {
  onDeleteNotification(filter: $filter, username: $username) {
    id
    username
    title
    message
    read
    user {
      username
      email
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
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
export const onCreateTransfer = /* GraphQL */ `subscription OnCreateTransfer(
  $filter: ModelSubscriptionTransferFilterInput
  $from: String
) {
  onCreateTransfer(filter: $filter, from: $from) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTransferSubscriptionVariables,
  APITypes.OnCreateTransferSubscription
>;
export const onUpdateTransfer = /* GraphQL */ `subscription OnUpdateTransfer(
  $filter: ModelSubscriptionTransferFilterInput
  $from: String
) {
  onUpdateTransfer(filter: $filter, from: $from) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTransferSubscriptionVariables,
  APITypes.OnUpdateTransferSubscription
>;
export const onDeleteTransfer = /* GraphQL */ `subscription OnDeleteTransfer(
  $filter: ModelSubscriptionTransferFilterInput
  $from: String
) {
  onDeleteTransfer(filter: $filter, from: $from) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTransferSubscriptionVariables,
  APITypes.OnDeleteTransferSubscription
>;
