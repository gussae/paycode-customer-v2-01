/* eslint-disable no-unused-vars */
// NotificationsComponent.tsx
import React, { useEffect, useState } from 'react';
import styles from './Demo.module.css';
import {
  Button,
  Input,
  Text,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

export interface GenericNotification {
  id: string;
  username: string;
  message: string;
  title: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsComponentProps {
  username: string;
  subscribeToNotifications: (
    username: string,
    Promise: (notification: GenericNotification) => void,
  ) => () => void;
  sendNotification: (
    notification: Omit<GenericNotification, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<void>;
}

export const NotificationsComponent: React.FC<NotificationsComponentProps> = ({
  username,
  subscribeToNotifications,
  sendNotification,
}) => {
  const [notifications, setNotifications] = useState<GenericNotification[]>([]);
  const [newNotification, setNewNotification] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const unsubscribe = subscribeToNotifications(username, notification => {
      setNotifications(prevNotifications => [
        notification,
        ...prevNotifications,
      ]);
    });

    return () => unsubscribe();
  }, [username, subscribeToNotifications]);

  const handleSendNotification = async () => {
    if (newNotification.trim() === '') return;
    await sendNotification({
      message: newNotification,
      username,
      title: 'New Notification',
      read: false,
    });
    setNewNotification(''); // Reset input after sending
  };

  return (
    <div className={styles.notificationContainer}>
      <BellIcon
        w={18}
        h={18}
        onClick={onOpen}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent className={styles.notificationModal}>
          <ModalHeader>Notifications</ModalHeader>
          <ModalBody>
            <Box className={styles.notificationsList}>
              {notifications.map((notification, index) => (
                <div key={notification.id} className={styles.notificationItem}>
                  <Text>
                    {' '}
                    {index + 1}. {notification.message}
                  </Text>
                </div>
              ))}
            </Box>
            <div className={styles.notificationTester}>
              <Input
                value={newNotification}
                onChange={e => setNewNotification(e.target.value)}
                placeholder="Type a notification message"
              />
              <Button onClick={handleSendNotification}>
                Send Notification
              </Button>
              <ModalCloseButton />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

