import createOpenApiClient from 'openapi-fetch';
import type { paths } from './openapi/types';
import { RelayEnvironment } from './RelayEnvironment';

const BASE_URLS: { [key in RelayEnvironment]: string } = {
  DEV: 'https://dev-api.relay.delivery/v2',
  PROD: 'https://dev-api.relay.delivery/v2',
};

export function createRelayClient({
  environment,
  authKey,
}: {
  environment: RelayEnvironment;
  authKey: string;
}) {
  const client: ReturnType<typeof createOpenApiClient<paths>> =
    createOpenApiClient<paths>({
      baseUrl: BASE_URLS[environment],
      headers: { 'x-relay-auth': authKey },
    });
  return client;
}
