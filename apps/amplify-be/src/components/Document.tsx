// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Input,
//   Text,
//   VStack,
//   HStack,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   IconButton,
// } from '@chakra-ui/react';
// import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
// import // Adjust import path as necessary
// import styles from '../css/Demo.module.css';

// const DocumentsComponent: React.FC<BalanceComponentProps> = ({username}) => {
//   const [documents, setDocuments] = useState([]);
//   const [newDocumentName, setNewDocumentName] = useState('');

//   //TODO  - implement CRUDL operations for documents
//   console.log(username)

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       const docs = await listDocuments(); // Simulated fetch call
//       setDocuments(docs);
//     };
//     fetchDocuments();
//   }, []);

//   const handleCreateDocument = async () => {
//     if (newDocumentName.trim() === '') return;
//     const newDoc = await createDocument({ name: newDocumentName });
//     setDocuments([...documents, newDoc]);
//     setNewDocumentName('');
//   };

//   const handleUpdateDocument = async (id, updatedInfo) => {
//     await updateDocument(id, updatedInfo);
//   };

//   const handleDeleteDocument = async id => {
//     await deleteDocument(id);
//     setDocuments(documents.filter(doc => doc.id !== id));
//   };

//   return (
//     <Box className={styles.documentsContainer}>
//       <Text  className={styles.boxTextSize}>Documents</Text>
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             <Th>Document Name</Th>
//             <Th>Actions</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {documents.map(doc => (
//             <Tr key={doc.id}>
//               <Td>{doc.name}</Td>
//               <Td>
//                 <IconButton
//                   aria-label="Edit document"
//                   icon={<EditIcon />}
//                   onClick={() =>
//                     handleUpdateDocument(doc.id, { name: 'Updated Name' })
//                   } // Example usage
//                 />
//                 <IconButton
//                   aria-label="Delete document"
//                   icon={<DeleteIcon />}
//                   onClick={() => handleDeleteDocument(doc.id)}
//                   ml={2}
//                 />
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//       <Box mt={4}>
//         <HStack>
//           <Input
//             placeholder="New Document Name"
//             value={newDocumentName}
//             onChange={e => setNewDocumentName(e.target.value)}
//           />
//           <Button onClick={handleCreateDocument}>Add Document</Button>
//         </HStack>
//       </Box>
//       <VStack spacing={4}>
//         {documents.map(doc => (
//           <Box key={doc.id} p={5} shadow="md" borderWidth="1px">
//             <Text fontWeight="bold">{doc.name}</Text>
//             <Text mt={2}>{doc.content}</Text>
//           </Box>
//         ))}
//       </VStack>
//     </Box>
//   );
// };

// export default DocumentsComponent;
