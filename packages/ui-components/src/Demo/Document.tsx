/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './Demo.module.css';

export interface Doc {
  dirname: string;
  filename: string;
  entityType: string;
  mimetype: string;
  size: number;
  username: string;
  version?: string;
}

export interface UploadDocumentParams extends Omit<Doc, 'size' | 'version'> {
  expiry: number;
  content: Blob | string;
}

export interface DownloadDocumentParams
  extends Omit<Doc, 'entityType' | 'mimetype' | 'size'> {
  expiry?: number;
}

export type DeleteDocumentParams = Omit<
  DownloadDocumentParams,
  'expiry' | 'entityType' | 'mimetype' | 'size'
>;

export interface DocumentProps {
  getDocumentIndex: (params: {
    username: string;
    key: string;
  }) => Promise<any[]>;
  listDocuments: (params: { username: string }) => Promise<any[]>;
  uploadDocument: (params: UploadDocumentParams) => Promise<boolean>;
  downloadDocument: (params: DownloadDocumentParams) => Promise<string | null>;
  deleteDocument: (params: DeleteDocumentParams) => Promise<boolean>;
  username: string;
}

const DocumentComponent: React.FC<DocumentProps> = ({
  getDocumentIndex, //not implemented
  listDocuments,
  uploadDocument,
  downloadDocument,
  deleteDocument,
  username,
}) => {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);

  const toast = useToast();

  const fetchDocuments = useCallback(async () => {
    try {
      const docs = await listDocuments({ username });
      //@ts-ignore description:
      setDocuments(docs);
    } catch (error) {
      toast({
        title: 'Error fetching documents.',
        description: 'Unable to fetch documents. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [username, listDocuments, toast]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploading(true);
      try {
        await uploadDocument({
          dirname: 'test/documents',
          filename: file.name,
          entityType: 'DOCUMENT',
          expiry: 3600,
          mimetype: file.type,
          content: file,
          username,
        });
        fetchDocuments(); // Refresh list after successful upload
      } catch (error) {
        toast({
          title: 'Error uploading document.',
          description: 'Unable to upload document. Please try again.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDownload = async (doc: Doc) => {
    try {
      const signedUrl = await downloadDocument({
        dirname: doc.dirname,
        filename: doc.filename,
        username: doc.username,
        version: doc.version,
      });

      // Fetching the file using the signed URL
      if (!signedUrl) throw new Error('Failed to get signed URL');
      const response = await fetch(signedUrl);
      if (!response.ok)
        throw new Error('Failed to fetch the file for download.');

      // Reading the content as a Blob
      const blob = await response.blob();

      // Creating a temporary link to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = doc.filename; // Setting a filename for the download
      document.body.appendChild(downloadLink); // Adding the link to the document
      downloadLink.click(); // Triggering the download
      window.URL.revokeObjectURL(downloadLink.href); // Cleaning up the object URL
      document.body.removeChild(downloadLink); // Removing the link from the document
    } catch (error) {
      console.error('Error during download:', error);
      alert('An error occurred while trying to download the document.');
    }
  };

  const handleDelete = async (doc: Doc) => {
    try {
      const success = await deleteDocument({
        username: username,
        dirname: doc.dirname,
        filename: doc.filename,
        version: doc.version, // This could be optional
      });
      if (success) {
        toast({
          title: 'Document deleted.',
          description: 'The document has been successfully deleted.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        fetchDocuments(); // Refresh list after successful deletion
      }
    } catch (error) {
      toast({
        title: 'Error deleting document.',
        description: 'Unable to delete document. Please try again.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className={styles.documentsContainer}>
      <VStack spacing={4}>
        <Text className={styles.boxTextSize} color="whiteAlpha.900">
          Your Documents
        </Text>
        <Table className={styles.documentTable} variant="simple">
          <Thead>
            <Tr>
              <Th>File Name</Th>
              <Th>Entity Type</Th>
              <Th>Size (KB)</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {documents.map((doc: any) => (
              <Tr key={`${doc.key}-${doc.version}`}>
                <Td color="whiteAlpha.900">{doc.filename}</Td>
                <Td color="whiteAlpha.900">{doc.entityType}</Td>
                <Td color="whiteAlpha.900">
                  {doc.size ? `${Math.round(doc.size / 1024)} KB` : 'N/A'}
                </Td>
                <Td>
                  <HStack spacing={5}>
                    {' '}
                    <IconButton
                      aria-label="Download document"
                      icon={<DownloadIcon />}
                      onClick={() => handleDownload(doc)}
                    />
                    <IconButton
                      aria-label="Delete document"
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(doc)}
                      colorScheme="red"
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div className={styles.inputFileContainer}>
          {' '}
          {/* Wrap input and button for spacing */}
          <Input type="file" onChange={handleUpload} disabled={uploading} />
          <Button onClick={fetchDocuments}>Refresh Document List</Button>
        </div>
      </VStack>
    </Box>
  );
};
export default DocumentComponent;
