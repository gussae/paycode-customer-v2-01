/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createProfile = /* GraphQL */ `mutation CreateProfile(
  $input: CreateProfileInput!
  $condition: ModelProfileConditionInput
) {
  createProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProfileMutationVariables,
  APITypes.CreateProfileMutation
>;
export const updateProfile = /* GraphQL */ `mutation UpdateProfile(
  $input: UpdateProfileInput!
  $condition: ModelProfileConditionInput
) {
  updateProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProfileMutationVariables,
  APITypes.UpdateProfileMutation
>;
export const deleteProfile = /* GraphQL */ `mutation DeleteProfile(
  $input: DeleteProfileInput!
  $condition: ModelProfileConditionInput
) {
  deleteProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProfileMutationVariables,
  APITypes.DeleteProfileMutation
>;
export const createNotification = /* GraphQL */ `mutation CreateNotification(
  $input: CreateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  createNotification(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateNotificationMutationVariables,
  APITypes.CreateNotificationMutation
>;
export const updateNotification = /* GraphQL */ `mutation UpdateNotification(
  $input: UpdateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  updateNotification(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateNotificationMutationVariables,
  APITypes.UpdateNotificationMutation
>;
export const deleteNotification = /* GraphQL */ `mutation DeleteNotification(
  $input: DeleteNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  deleteNotification(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteNotificationMutationVariables,
  APITypes.DeleteNotificationMutation
>;
export const createTransfer = /* GraphQL */ `mutation CreateTransfer(
  $input: CreateTransferInput!
  $condition: ModelTransferConditionInput
) {
  createTransfer(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateTransferMutationVariables,
  APITypes.CreateTransferMutation
>;
export const updateTransfer = /* GraphQL */ `mutation UpdateTransfer(
  $input: UpdateTransferInput!
  $condition: ModelTransferConditionInput
) {
  updateTransfer(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateTransferMutationVariables,
  APITypes.UpdateTransferMutation
>;
export const deleteTransfer = /* GraphQL */ `mutation DeleteTransfer(
  $input: DeleteTransferInput!
  $condition: ModelTransferConditionInput
) {
  deleteTransfer(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteTransferMutationVariables,
  APITypes.DeleteTransferMutation
>;
