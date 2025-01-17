import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloakService = inject(KeycloakService);

  const isLoggedIn = await keycloakService.isLoggedIn();

  if (!isLoggedIn) {
    await keycloakService.login({
      redirectUri: window.location.origin + state.url,
    });
    return false;
  }

  const token = await keycloakService.getToken();

  const decodedToken = decodeToken(token);
  const permissions = decodedToken?.resource_access?.['smart-rating']?.roles || [];

  if (permissions.includes('ALL')) {
    return true;
  }

  const requiredPermission = route.data?.['permission'];

  if (requiredPermission && !permissions.includes(requiredPermission)) {
    console.warn(`Acesso negado - Permissão requerida: ${requiredPermission}`);
    return false; 
  }

  return true; 
};

function decodeToken(token: string): any {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}
