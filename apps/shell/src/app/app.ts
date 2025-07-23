import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  imports: [RouterModule, SidebarComponent],
  selector: 'app-root',
  template: `
    <app-sidebar>
      <router-outlet></router-outlet>
    </app-sidebar>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class App {
  title = 'shell';
} 