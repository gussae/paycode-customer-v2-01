/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosResponse } from 'axios';
import { RunApiOps } from '@paycode-customer-v2/lib/dist/cjs';

export interface QrcodeResponse {
  qrcodeUrl: string;
}

export async function generateQrcode(
  props: RunApiOps,
): Promise<QrcodeResponse> {
  const {
    event: { body },
    apiUrl,
    apiKey,
  } = props;
  if (!body || typeof body !== 'string') {
    throw new Error('Invalid request body');
  }
  const { username } = JSON.parse(body) as unknown as {
    username: string;
  };
  if (!username) {
    throw new Error('Username and amount are required');
  }

  console.log(`Generating QR code for username: ${username}`);

  // Check if apiUrl is meant for a mock response
  if (apiUrl.toLowerCase().endsWith('mock')) {
    // For mock responses, generate a dummy QR code URL
    return {
      qrcodeUrl:
        'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Username:tester',
    };
  }

  const url = `${apiUrl}/qrCode/username=${username}`;
  const config = {
    method: 'get',
    url: url,
    headers: {
      'x-api-key': apiKey,
    },
  };

  try {
    const response: AxiosResponse<QrcodeResponse> = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to generate QR code for ${username}: ${error}`);
  }
}
