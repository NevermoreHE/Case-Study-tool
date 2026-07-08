import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return async () => {
    return await keycloak.init({
      config: {
        // https://keycloak.nevermore.simavi.ro/
        url: 'https://keycloak.nevermore.simavi.ro',
        realm: 'nevermore',
        clientId: 'localcasetool-ui',
      },
      initOptions: {
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: true,
  checkLoginIframeInterval: 2,
      }
    });
  };
}
  