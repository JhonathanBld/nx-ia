import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="home-container">
      <h2>🏠 Welcome to Shell Application</h2>
      <p>This is the main shell application that loads micro frontends.</p>
      
      <div class="features">
        <div class="feature-card">
          <h3>📊 Dashboard MFE</h3>
          <p>Click below to load the Dashboard micro frontend:</p>
          <a routerLink="/dashboard" class="btn">Load Dashboard</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .features {
      margin-top: 2rem;
    }
    
    .feature-card {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .btn {
      display: inline-block;
      background: #007bff;
      color: white;
      padding: 0.5rem 1rem;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.3s;
    }
    
    .btn:hover {
      background: #0056b3;
    }
  `]
})
export class HomeComponent {} 