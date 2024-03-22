/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const preflightCacheTtl = process.env.PREFLIGHT_CACHE_TTL || '3600';
const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS || '[]');
const isConsole =
  process.env.LOGGING_LEVEL?.toLowerCase() === 'debug' ||
  process.env.LOGGING_LEVEL?.toLowerCase() === 'verbose';

/**
 * Adds CORS headers to the response object.
 * @param response - The response object.
 * @param allowedOrigin - The allowed origin for CORS.
 * @returns The response object with added CORS headers.
 */
export const addCORSHeaders = (response: any, allowedOrigin: string): any => {
  response.headers = {
    ...response.headers,
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers':
      'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': preflightCacheTtl,
  };
  return response;
};

/**
 * Creates a response object with the specified status code and body.
 * If the request origin is allowed, CORS headers are added to the response.
 * @param eventHeaders - The headers of the incoming request.
 * @param statusCode - The status code of the response.
 * @param body - The body of the response.
 * @returns The response object.
 */
export const createResponse = (
  eventHeaders: Record<string, unknown>,
  statusCode: number,
  body: Record<string, unknown> | string,
): APIGatewayProxyResult => {
  let origin;
  if (eventHeaders) origin = eventHeaders['Origin'] || eventHeaders['origin'];
  const basicResponse = {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (origin && allowedOrigins.includes(origin)) {
    return addCORSHeaders(basicResponse, origin as string);
  } else {
    return basicResponse;
  }
};

//error
export interface APIError {
  name: string;
  message: string;
  statusCode?: number;
}

export const handleError = (error: APIError | Error): APIGatewayProxyResult => {
  console.error(error); // Log the error for detailed diagnostics

  // Define default error response
  const response = {
    statusCode: 500,
    body: JSON.stringify({ message: 'Internal Server Error' }),
  };

  // Mapping of error names to HTTP status codes and user-friendly messages
  const errorMappings: Record<string, { statusCode: number; message: string }> =
    {
      ValidationError: { statusCode: 400, message: 'Validation failed' },
      UnauthorizedError: { statusCode: 401, message: 'Unauthorized access' },
      ForbiddenError: { statusCode: 403, message: 'Access forbidden' },
      NotFoundError: { statusCode: 404, message: 'Resource not found' },
      MethodNotAllowedError: { statusCode: 405, message: 'Method not allowed' },
      ConflictError: { statusCode: 409, message: 'Resource conflict' },
      InternalServerError: {
        statusCode: 500,
        message: 'Internal server error',
      },
      ServiceUnavailableError: {
        statusCode: 503,
        message: 'Service unavailable',
      },
    };

  // Attempt to match the error with a known error mapping
  if (errorMappings[error.name]) {
    const mappedError = errorMappings[error.name];
    response.statusCode = mappedError?.statusCode as number;
    response.body = JSON.stringify({
      message: error.message || mappedError?.message,
    });
  } else if ((error as APIError).statusCode) {
    // Use the statusCode if provided by the error
    response.statusCode = (error as APIError).statusCode as number;
    response.body = JSON.stringify({ message: error.message });
  }

  return response;
};
export interface RunApiOps {
  event: APIGatewayProxyEvent;
  apiUrl: string;
  apiKey: string;
}

export interface RunApiOpsProps {
  operation: (props: RunApiOps) => Promise<any>;
  event: APIGatewayProxyEvent;
  apiUrl: string;
  apiKey: string;
}

export async function runApiOps({
  operation,
  event,
  apiUrl,
  apiKey,
}: RunApiOpsProps): Promise<APIGatewayProxyResult> {
  try {
    if (isConsole) console.log({ event });
    const result = await operation({ event, apiUrl, apiKey });
    const response = createResponse(event.headers, 200, result);
    if (isConsole) console.log({ response });
    return response;
  } catch (error) {
    console.error('Error:', error);
    return handleError(error as APIError);
  }
}
