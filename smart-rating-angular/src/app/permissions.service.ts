import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private permissions: string[] = [];

  constructor(private keycloakService: KeycloakService) {}

  async loadPermissions(): Promise<void> {
    const token = await this.keycloakService.getToken();
    const decodedToken = this.decodeToken(token);
    this.permissions = decodedToken?.resource_access?.['smart-rating']?.roles || [];
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission) || this.permissions.includes('ALL');
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}
