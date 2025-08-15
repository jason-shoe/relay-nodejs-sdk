import createOpenApiClient from 'openapi-fetch';
import type { paths } from './openapi/types';
import { RelayEnvironment } from './RelayEnvironment';

const BASE_URLS: { [key in RelayEnvironment]: string } = {
  DEV: 'https://dev-api.relay.delivery/v2',
  PROD: 'https://api.relay.delivery/v2',
};

export type RelayClient = ReturnType<typeof createOpenApiClient<paths>>;

export function createRelayClient({
  environment,
  authKey,
}: {
  environment: RelayEnvironment;
  authKey: string;
}): RelayClient {
  return createOpenApiClient<paths>({
    baseUrl: BASE_URLS[environment],
    headers: { 'x-relay-auth': authKey },
  });
}
