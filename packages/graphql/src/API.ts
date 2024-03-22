/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type DocumentKeyInput = {
  dirname: string,
  filename: string,
  username: string,
  version?: string | null,
};

export type UploadDocumentInput = {
  dirname: string,
  extension: string,
  filename: string,
  size: number,
  ttl?: number | null,
  type: string,
  username: string,
  version?: string | null,
};

export type Document = {
  __typename: "Document",
  username: string,
  key: string,
  version: string,
  filename: string,
  extension: string,
  dirname: string,
  size: number,
  ttl?: number | null,
  type: string,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  userDocumentUsername?: string | null,
};

export type User = {
  __typename: "User",
  username: string,
  email: string,
  document?: ModelDocumentConnection | null,
  profile?: Profile | null,
  notifications?: ModelNotificationConnection | null,
  createdAt: string,
  updatedAt: string,
  userProfileUsername?: string | null,
};

export type ModelDocumentConnection = {
  __typename: "ModelDocumentConnection",
  items:  Array<Document | null >,
  nextToken?: string | null,
};

export type Profile = {
  __typename: "Profile",
  username: string,
  bio?: string | null,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  username: string,
  title: string,
  message: string,
  read: boolean,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  userNotificationsUsername?: string | null,
};

export type CreateNotificationInput = {
  id?: string | null,
  username: string,
  title: string,
  message: string,
  read: boolean,
  userNotificationsUsername?: string | null,
};

export type ModelNotificationConditionInput = {
  username?: ModelStringInput | null,
  title?: ModelStringInput | null,
  message?: ModelStringInput | null,
  read?: ModelBooleanInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
  userNotificationsUsername?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateNotificationInput = {
  id: string,
  username?: string | null,
  title?: string | null,
  message?: string | null,
  read?: boolean | null,
  userNotificationsUsername?: string | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type CreateTransferInput = {
  id?: string | null,
  from: string,
  to: string,
  amount: number,
  status: TransferStatus,
};

export enum TransferStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}


export type ModelTransferConditionInput = {
  from?: ModelStringInput | null,
  to?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  status?: ModelTransferStatusInput | null,
  and?: Array< ModelTransferConditionInput | null > | null,
  or?: Array< ModelTransferConditionInput | null > | null,
  not?: ModelTransferConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelTransferStatusInput = {
  eq?: TransferStatus | null,
  ne?: TransferStatus | null,
};

export type Transfer = {
  __typename: "Transfer",
  id: string,
  from: string,
  to: string,
  amount: number,
  status: TransferStatus,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTransferInput = {
  id: string,
  from?: string | null,
  to?: string | null,
  amount?: number | null,
  status?: TransferStatus | null,
};

export type DeleteTransferInput = {
  id: string,
};

export type CreateUserInput = {
  username: string,
  email: string,
  userProfileUsername?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  userProfileUsername?: ModelStringInput | null,
};

export type UpdateUserInput = {
  username: string,
  email?: string | null,
  userProfileUsername?: string | null,
};

export type DeleteUserInput = {
  username: string,
};

export type CreateProfileInput = {
  username: string,
  bio?: string | null,
};

export type ModelProfileConditionInput = {
  bio?: ModelStringInput | null,
  and?: Array< ModelProfileConditionInput | null > | null,
  or?: Array< ModelProfileConditionInput | null > | null,
  not?: ModelProfileConditionInput | null,
};

export type UpdateProfileInput = {
  username: string,
  bio?: string | null,
};

export type DeleteProfileInput = {
  username: string,
};

export type CreateDocumentInput = {
  username: string,
  key: string,
  version: string,
  filename: string,
  extension: string,
  dirname: string,
  size: number,
  ttl?: number | null,
  type: string,
  userDocumentUsername?: string | null,
};

export type ModelDocumentConditionInput = {
  version?: ModelStringInput | null,
  filename?: ModelStringInput | null,
  extension?: ModelStringInput | null,
  dirname?: ModelStringInput | null,
  size?: ModelFloatInput | null,
  ttl?: ModelIntInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelDocumentConditionInput | null > | null,
  or?: Array< ModelDocumentConditionInput | null > | null,
  not?: ModelDocumentConditionInput | null,
  userDocumentUsername?: ModelStringInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type DeleteDocumentInput = {
  username: string,
  key: string,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  title?: ModelStringInput | null,
  message?: ModelStringInput | null,
  read?: ModelBooleanInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
  userNotificationsUsername?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTransferFilterInput = {
  id?: ModelIDInput | null,
  from?: ModelStringInput | null,
  to?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  status?: ModelTransferStatusInput | null,
  and?: Array< ModelTransferFilterInput | null > | null,
  or?: Array< ModelTransferFilterInput | null > | null,
  not?: ModelTransferFilterInput | null,
};

export type ModelTransferConnection = {
  __typename: "ModelTransferConnection",
  items:  Array<Transfer | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  userProfileUsername?: ModelStringInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelProfileFilterInput = {
  username?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  and?: Array< ModelProfileFilterInput | null > | null,
  or?: Array< ModelProfileFilterInput | null > | null,
  not?: ModelProfileFilterInput | null,
};

export type ModelProfileConnection = {
  __typename: "ModelProfileConnection",
  items:  Array<Profile | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelDocumentFilterInput = {
  username?: ModelStringInput | null,
  key?: ModelStringInput | null,
  version?: ModelStringInput | null,
  filename?: ModelStringInput | null,
  extension?: ModelStringInput | null,
  dirname?: ModelStringInput | null,
  size?: ModelFloatInput | null,
  ttl?: ModelIntInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelDocumentFilterInput | null > | null,
  or?: Array< ModelDocumentFilterInput | null > | null,
  not?: ModelDocumentFilterInput | null,
  userDocumentUsername?: ModelStringInput | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  read?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionTransferFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  to?: ModelSubscriptionStringInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  status?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTransferFilterInput | null > | null,
  or?: Array< ModelSubscriptionTransferFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionProfileFilterInput = {
  bio?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProfileFilterInput | null > | null,
  or?: Array< ModelSubscriptionProfileFilterInput | null > | null,
};

export type DownloadDocumentMutationVariables = {
  input: DocumentKeyInput,
};

export type DownloadDocumentMutation = {
  downloadDocument?: string | null,
};

export type UploadDocumentMutationVariables = {
  input: UploadDocumentInput,
};

export type UploadDocumentMutation = {
  uploadDocument?:  {
    __typename: "Document",
    username: string,
    key: string,
    version: string,
    filename: string,
    extension: string,
    dirname: string,
    size: number,
    ttl?: number | null,
    type: string,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userDocumentUsername?: string | null,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    username: string,
    title: string,
    message: string,
    read: boolean,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsUsername?: string | null,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    username: string,
    title: string,
    message: string,
    read: boolean,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsUsername?: string | null,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    username: string,
    title: string,
    message: string,
    read: boolean,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsUsername?: string | null,
  } | null,
};

export type CreateTransferMutationVariables = {
  input: CreateTransferInput,
  condition?: ModelTransferConditionInput | null,
};

export type CreateTransferMutation = {
  createTransfer?:  {
    __typename: "Transfer",
    id: string,
    from: string,
    to: string,
    amount: number,
    status: TransferStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTransferMutationVariables = {
  input: UpdateTransferInput,
  condition?: ModelTransferConditionInput | null,
};

export type UpdateTransferMutation = {
  updateTransfer?:  {
    __typename: "Transfer",
    id: string,
    from: string,
    to: string,
    amount: number,
    status: TransferStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTransferMutationVariables = {
  input: DeleteTransferInput,
  condition?: ModelTransferConditionInput | null,
};

export type DeleteTransferMutation = {
  deleteTransfer?:  {
    __typename: "Transfer",
    id: string,
    from: string,
    to: string,
    amount: number,
    status: TransferStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    username: string,
    email: string,
    document?:  {
      __typename: "ModelDocumentConnection",
      items:  Array< {
        __typename: "Document",
        username: string,
        key: string,
        version: string,
        filename: string,
        extension: string,
        dirname: string,
        size: number,
        ttl?: number | null,
        type: string,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userDocumentUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile?:  {
      __typename: "Profile",
      username: string,
      bio?: string | null,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        username: string,
        title: string,
        message: string,
        read: boolean,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userNotificationsUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userProfileUsername?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    username: string,
    email: string,
    document?:  {
      __typename: "ModelDocumentConnection",
      items:  Array< {
        __typename: "Document",
        username: string,
        key: string,
        version: string,
        filename: string,
        extension: string,
        dirname: string,
        size: number,
        ttl?: number | null,
        type: string,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userDocumentUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile?:  {
      __typename: "Profile",
      username: string,
      bio?: string | null,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        username: string,
        title: string,
        message: string,
        read: boolean,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userNotificationsUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userProfileUsername?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    username: string,
    email: string,
    document?:  {
      __typename: "ModelDocumentConnection",
      items:  Array< {
        __typename: "Document",
        username: string,
        key: string,
        version: string,
        filename: string,
        extension: string,
        dirname: string,
        size: number,
        ttl?: number | null,
        type: string,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userDocumentUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile?:  {
      __typename: "Profile",
      username: string,
      bio?: string | null,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        username: string,
        title: string,
        message: string,
        read: boolean,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userNotificationsUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userProfileUsername?: string | null,
  } | null,
};

export type CreateProfileMutationVariables = {
  input: CreateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type CreateProfileMutation = {
  createProfile?:  {
    __typename: "Profile",
    username: string,
    bio?: string | null,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProfileMutationVariables = {
  input: UpdateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type UpdateProfileMutation = {
  updateProfile?:  {
    __typename: "Profile",
    username: string,
    bio?: string | null,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProfileMutationVariables = {
  input: DeleteProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type DeleteProfileMutation = {
  deleteProfile?:  {
    __typename: "Profile",
    username: string,
    bio?: string | null,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDocumentMutationVariables = {
  input: CreateDocumentInput,
  condition?: ModelDocumentConditionInput | null,
};

export type CreateDocumentMutation = {
  createDocument?:  {
    __typename: "Document",
    username: string,
    key: string,
    version: string,
    filename: string,
    extension: string,
    dirname: string,
    size: number,
    ttl?: number | null,
    type: string,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userDocumentUsername?: string | null,
  } | null,
};

export type DeleteDocumentMutationVariables = {
  input: DeleteDocumentInput,
  condition?: ModelDocumentConditionInput | null,
};

export type DeleteDocumentMutation = {
  deleteDocument?:  {
    __typename: "Document",
    username: string,
    key: string,
    version: string,
    filename: string,
    extension: string,
    dirname: string,
    size: number,
    ttl?: number | null,
    type: string,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userDocumentUsername?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    username: string,
    title: string,
    message: string,
    read: boolean,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsUsername?: string | null,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      username: string,
      title: string,
      message: string,
      read: boolean,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userNotificationsUsername?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTransferQueryVariables = {
  id: string,
};

export type GetTransferQuery = {
  getTransfer?:  {
    __typename: "Transfer",
    id: string,
    from: string,
    to: string,
    amount: number,
    status: TransferStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTransfersQueryVariables = {
  filter?: ModelTransferFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransfersQuery = {
  listTransfers?:  {
    __typename: "ModelTransferConnection",
    items:  Array< {
      __typename: "Transfer",
      id: string,
      from: string,
      to: string,
      amount: number,
      status: TransferStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  username: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    username: string,
    email: string,
    document?:  {
      __typename: "ModelDocumentConnection",
      items:  Array< {
        __typename: "Document",
        username: string,
        key: string,
        version: string,
        filename: string,
        extension: string,
        dirname: string,
        size: number,
        ttl?: number | null,
        type: string,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userDocumentUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile?:  {
      __typename: "Profile",
      username: string,
      bio?: string | null,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        username: string,
        title: string,
        message: string,
        read: boolean,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userNotificationsUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userProfileUsername?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  username?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProfileQueryVariables = {
  username: string,
};

export type GetProfileQuery = {
  getProfile?:  {
    __typename: "Profile",
    username: string,
    bio?: string | null,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProfilesQueryVariables = {
  username?: string | null,
  filter?: ModelProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProfilesQuery = {
  listProfiles?:  {
    __typename: "ModelProfileConnection",
    items:  Array< {
      __typename: "Profile",
      username: string,
      bio?: string | null,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDocumentQueryVariables = {
  username: string,
  key: string,
};

export type GetDocumentQuery = {
  getDocument?:  {
    __typename: "Document",
    username: string,
    key: string,
    version: string,
    filename: string,
    extension: string,
    dirname: string,
    size: number,
    ttl?: number | null,
    type: string,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userDocumentUsername?: string | null,
  } | null,
};

export type ListDocumentsQueryVariables = {
  username?: string | null,
  key?: ModelStringKeyConditionInput | null,
  filter?: ModelDocumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDocumentsQuery = {
  listDocuments?:  {
    __typename: "ModelDocumentConnection",
    items:  Array< {
      __typename: "Document",
      username: string,
      key: string,
      version: string,
      filename: string,
      extension: string,
      dirname: string,
      size: number,
      ttl?: number | null,
      type: string,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userDocumentUsername?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type DocumentsByKeyAndVersionQueryVariables = {
  key: string,
  version?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDocumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type DocumentsByKeyAndVersionQuery = {
  documentsByKeyAndVersion?:  {
    __typename: "ModelDocumentConnection",
    items:  Array< {
      __typename: "Document",
      username: string,
      key: string,
      version: string,
      filename: string,
      extension: string,
      dirname: string,
      size: number,
      ttl?: number | null,
      type: string,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userDocumentUsername?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  username?: string | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    username: string,
    title: string,
    message: string,
    read: boolean,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsUsername?: string | null,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  username?: string | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    username: string,
    title: string,
    message: string,
    read: boolean,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsUsername?: string | null,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
  username?: string | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    username: string,
    title: string,
    message: string,
    read: boolean,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userNotificationsUsername?: string | null,
  } | null,
};

export type OnCreateTransferSubscriptionVariables = {
  filter?: ModelSubscriptionTransferFilterInput | null,
  from?: string | null,
};

export type OnCreateTransferSubscription = {
  onCreateTransfer?:  {
    __typename: "Transfer",
    id: string,
    from: string,
    to: string,
    amount: number,
    status: TransferStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTransferSubscriptionVariables = {
  filter?: ModelSubscriptionTransferFilterInput | null,
  from?: string | null,
};

export type OnUpdateTransferSubscription = {
  onUpdateTransfer?:  {
    __typename: "Transfer",
    id: string,
    from: string,
    to: string,
    amount: number,
    status: TransferStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTransferSubscriptionVariables = {
  filter?: ModelSubscriptionTransferFilterInput | null,
  from?: string | null,
};

export type OnDeleteTransferSubscription = {
  onDeleteTransfer?:  {
    __typename: "Transfer",
    id: string,
    from: string,
    to: string,
    amount: number,
    status: TransferStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  username?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    username: string,
    email: string,
    document?:  {
      __typename: "ModelDocumentConnection",
      items:  Array< {
        __typename: "Document",
        username: string,
        key: string,
        version: string,
        filename: string,
        extension: string,
        dirname: string,
        size: number,
        ttl?: number | null,
        type: string,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userDocumentUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile?:  {
      __typename: "Profile",
      username: string,
      bio?: string | null,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        username: string,
        title: string,
        message: string,
        read: boolean,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userNotificationsUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userProfileUsername?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  username?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    username: string,
    email: string,
    document?:  {
      __typename: "ModelDocumentConnection",
      items:  Array< {
        __typename: "Document",
        username: string,
        key: string,
        version: string,
        filename: string,
        extension: string,
        dirname: string,
        size: number,
        ttl?: number | null,
        type: string,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userDocumentUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile?:  {
      __typename: "Profile",
      username: string,
      bio?: string | null,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        username: string,
        title: string,
        message: string,
        read: boolean,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userNotificationsUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userProfileUsername?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  username?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    username: string,
    email: string,
    document?:  {
      __typename: "ModelDocumentConnection",
      items:  Array< {
        __typename: "Document",
        username: string,
        key: string,
        version: string,
        filename: string,
        extension: string,
        dirname: string,
        size: number,
        ttl?: number | null,
        type: string,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userDocumentUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile?:  {
      __typename: "Profile",
      username: string,
      bio?: string | null,
      user?:  {
        __typename: "User",
        username: string,
        email: string,
        document?:  {
          __typename: "ModelDocumentConnection",
          items:  Array< {
            __typename: "Document",
            username: string,
            key: string,
            version: string,
            filename: string,
            extension: string,
            dirname: string,
            size: number,
            ttl?: number | null,
            type: string,
            createdAt: string,
            updatedAt: string,
            userDocumentUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        profile?:  {
          __typename: "Profile",
          username: string,
          bio?: string | null,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        notifications?:  {
          __typename: "ModelNotificationConnection",
          items:  Array< {
            __typename: "Notification",
            id: string,
            username: string,
            title: string,
            message: string,
            read: boolean,
            createdAt: string,
            updatedAt: string,
            userNotificationsUsername?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userProfileUsername?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        username: string,
        title: string,
        message: string,
        read: boolean,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        userNotificationsUsername?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userProfileUsername?: string | null,
  } | null,
};

export type OnCreateProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
  username?: string | null,
};

export type OnCreateProfileSubscription = {
  onCreateProfile?:  {
    __typename: "Profile",
    username: string,
    bio?: string | null,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
  username?: string | null,
};

export type OnUpdateProfileSubscription = {
  onUpdateProfile?:  {
    __typename: "Profile",
    username: string,
    bio?: string | null,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
  username?: string | null,
};

export type OnDeleteProfileSubscription = {
  onDeleteProfile?:  {
    __typename: "Profile",
    username: string,
    bio?: string | null,
    user?:  {
      __typename: "User",
      username: string,
      email: string,
      document?:  {
        __typename: "ModelDocumentConnection",
        items:  Array< {
          __typename: "Document",
          username: string,
          key: string,
          version: string,
          filename: string,
          extension: string,
          dirname: string,
          size: number,
          ttl?: number | null,
          type: string,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userDocumentUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      profile?:  {
        __typename: "Profile",
        username: string,
        bio?: string | null,
        user?:  {
          __typename: "User",
          username: string,
          email: string,
          document?:  {
            __typename: "ModelDocumentConnection",
            nextToken?: string | null,
          } | null,
          profile?:  {
            __typename: "Profile",
            username: string,
            bio?: string | null,
            createdAt: string,
            updatedAt: string,
          } | null,
          notifications?:  {
            __typename: "ModelNotificationConnection",
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userProfileUsername?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        items:  Array< {
          __typename: "Notification",
          id: string,
          username: string,
          title: string,
          message: string,
          read: boolean,
          user?:  {
            __typename: "User",
            username: string,
            email: string,
            createdAt: string,
            updatedAt: string,
            userProfileUsername?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          userNotificationsUsername?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userProfileUsername?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
