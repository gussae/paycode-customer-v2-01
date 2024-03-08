// import React, { useState, useEffect } from 'react';
// import { Box, Image, Text } from '@chakra-ui/react';
// import { getProxyApiAdapter } from '../utils';
// import styles from '../css/Demo.module.css';

// const QRCodeComponent = () => {
//   const [qrCodeUrl, setQrCodeUrl] = useState('');

//   useEffect(() => {
//     const fetchQRCode = async () => {
//       try {
//         const username = 'test'
//         const proxyApi = await getProxyApiAdapter();
//TODO ! not implemented yet
//         const result = await proxyApi.getQRCode({ username });
//         setQrCodeUrl(response.url);
//       } catch (error) {
//         console.error('Error fetching QR code:', error);
//       }
//     };

//     fetchQRCode();
//   }, []);

//   return (
//     <Box className={styles.qrCodeContainer} textAlign="center" p={4}>
//       <Text  className={styles.boxTextSize} mb={4}>Your QR Code</Text>
//       {qrCodeUrl && <Image src={qrCodeUrl} alt="QR Code" boxSize="150px" objectFit="cover" />}
//     </Box>
//   );
// };

// export default QRCodeComponent;
