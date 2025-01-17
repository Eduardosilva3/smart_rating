import { Component, OnInit } from '@angular/core';
import { PermissionsService } from './permissions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'smart-rating-angular';
  
    constructor(private permissionsService: PermissionsService) {}
  
    async ngOnInit(): Promise<void> {
      await this.permissionsService.loadPermissions();
    }
  
}
