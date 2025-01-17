import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { PermissionsService } from '../permissions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private permissionsService: PermissionsService,
    private keycloakService: KeycloakService
  ) {}

  canAccessPresentation(): boolean {
    return this.permissionsService.hasPermission('TELA_APRESENTACAO');
  }

  canAccessEvaluation(): boolean {
    return this.permissionsService.hasPermission('TELA_AVALIACAO');
  }

  async logout(): Promise<void> {
    await this.keycloakService.logout(window.location.origin);
  }
}
