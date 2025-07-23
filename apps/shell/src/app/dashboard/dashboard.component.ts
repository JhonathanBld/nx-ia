import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard-container">
      <h2>📊 Dashboard MFE</h2>
      <p>Este é o componente Dashboard no Shell Application.</p>
      
      <div class="info-card">
        <h3>ℹ️ Informações do MFE</h3>
        <ul>
          <li><strong>Shell:</strong> Porta 4200</li>
          <li><strong>Dashboard:</strong> Porta 4201</li>
          <li><strong>Status:</strong> Funcionando</li>
        </ul>
      </div>
      
      <div class="actions">
        <a href="http://localhost:4201" target="_blank" class="btn">
          🔗 Abrir Dashboard Direto
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .info-card {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }
    
    .info-card ul {
      list-style: none;
      padding: 0;
    }
    
    .info-card li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #dee2e6;
    }
    
    .info-card li:last-child {
      border-bottom: none;
    }
    
    .actions {
      margin-top: 2rem;
    }
    
    .btn {
      display: inline-block;
      background: #28a745;
      color: white;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.3s;
    }
    
    .btn:hover {
      background: #218838;
    }
  `]
})
export class DashboardComponent {} 