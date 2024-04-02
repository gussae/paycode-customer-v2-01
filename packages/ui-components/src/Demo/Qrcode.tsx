/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Box, Button, Image } from '@chakra-ui/react';
import styles from './Demo.module.css';

export interface GenerateQrcodeResponse {
  qrcodeUrl: string;
}

export interface QrcodeComponentProps {
  username: string;
  generateQrcode: (params: {
    username: string;
  }) => Promise<GenerateQrcodeResponse>;
}

export const QrcodeComponent: React.FC<QrcodeComponentProps> = ({
  username,
  generateQrcode,
}) => {
  const [qrcodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  const handleGenerateQrcode = async () => {
    try {
      const { qrcodeUrl: _qrcodeUrl } = await generateQrcode({ username });
      setQrCodeUrl(_qrcodeUrl);
      setIsOverlayOpen(true); // Show overlay with the link
    } catch (err) {
      console.error('Error generating QR code:', err);
      setQrCodeUrl(null);
    }
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <Box className={styles.qrCodeContainer}>
      <Button onClick={handleGenerateQrcode} className={styles.generateButton}>
        Generate QR Code
      </Button>
      {isOverlayOpen && qrcodeUrl && (
        <Box className={styles.overlay}>
          <Box className={styles.overlayContent}>
            <Image
              src={qrcodeUrl}
              alt="QR Code"
              className={styles.qrCodeImage}
            />
            <Button onClick={handleCloseOverlay} className={styles.closeButton}>
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
