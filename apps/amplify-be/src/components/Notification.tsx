import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createNotification } from '../graphql/mutations';
import { onCreateNotification } from '../graphql/subscriptions';
import { Notification } from '../graphql/API';
import styles from '../css/Demo.module.css';
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
interface NotificationsComponentProps {
  username: string;
}

const NotificationsComponent: React.FC<NotificationsComponentProps> = ({
  username,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const client = generateClient();

  useEffect(() => {
    const subscription = client
      .graphql({
        query: onCreateNotification,
        variables: { username },
      })
      .subscribe({
        next: ({ data }) => {
          const subscriptionData = data.onCreateNotification;
          if (subscriptionData) {
            setNotifications(prevNotifications => {
              const newNotification: Notification = {
                __typename: 'Notification',
                id: subscriptionData.id,
                username: subscriptionData.username,
                title: subscriptionData.title,
                message: subscriptionData.message,
                read: subscriptionData.read,
                createdAt: subscriptionData.createdAt,
                updatedAt: subscriptionData.updatedAt,
              };
              return [newNotification, ...prevNotifications];
            });
          }
        },
        error: error => console.error(error),
      });

    return () => subscription.unsubscribe();
  }, []);

  const handleSendNotification = async () => {
    if (newNotification.trim() === '') return;
    await client.graphql({
      query: createNotification,
      variables: {
        input: {
          message: newNotification,
          username,
          title: 'New Notification',
          read: false,
        },
      },
    });
    setNewNotification(''); // Reset input after sending
  };

  return (
    <div className={styles.notificationContainer}>
      <BellIcon
        as={BellIcon}
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
                <div key={index} className={styles.notificationItem}>
                  <Text key={index}> {index + 1} {notification.message}</Text>
                </div>
              ))}
            </Box>
            <div className = {styles.notificationTester}>
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

export default NotificationsComponent;
