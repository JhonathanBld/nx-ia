import { Component, OnInit } from '@angular/core';
<% if (requiredImports.includes('CommonModule')) { %>import { CommonModule } from '@angular/common';<% } %>
<% if (requiredImports.includes('FormsModule')) { %>import { FormsModule, ReactiveFormsModule } from '@angular/forms';<% } %>
<% if (requiredImports.includes('MatCardModule')) { %>import { MatCardModule } from '@angular/material/card';<% } %>
<% if (requiredImports.includes('MatTableModule')) { %>import { MatTableModule } from '@angular/material/table';<% } %>
<% if (requiredImports.includes('MatButtonModule')) { %>import { MatButtonModule } from '@angular/material/button';<% } %>
<% if (requiredImports.includes('MatIconModule')) { %>import { MatIconModule } from '@angular/material/icon';<% } %>
<% if (requiredImports.includes('MatInputModule')) { %>import { MatInputModule } from '@angular/material/input';<% } %>
<% if (requiredImports.includes('MatFormFieldModule')) { %>import { MatFormFieldModule } from '@angular/material/form-field';<% } %>
<% if (requiredImports.includes('MatExpansionModule')) { %>import { MatExpansionModule } from '@angular/material/expansion';<% } %>
<% if (requiredImports.includes('MatPaginatorModule')) { %>import { MatPaginatorModule } from '@angular/material/paginator';<% } %>
<% if (requiredImports.includes('MatSortModule')) { %>import { MatSortModule } from '@angular/material/sort';<% } %>
<% if (requiredImports.includes('MatMenuModule')) { %>import { MatMenuModule } from '@angular/material/menu';<% } %>

@Component({
  selector: 'app-<%= fileName %>',
  standalone: true,
  imports: [
    <% requiredImports.forEach(function(importName, index) { %>
    <%= importName %><% if (index < requiredImports.length - 1) { %>,<% } %>
    <% }); %>
  ],
  templateUrl: './<%= fileName %>.component.html',
  styleUrls: ['./<%= fileName %>.component.scss']
})
export class <%= className %>Component implements OnInit {
  searchTerm = '';
  
  <% if (features.includes('tabela')) { %>
  displayedColumns: string[] = [
    <% if (columns && columns.length > 0) { %>
      <% columns.forEach(function(column, index) { %>
      '<%= column %>'<% if (index < columns.length - 1) { %>,<% } %>
      <% }); %>
    <% } else { %>
    'id', 'nome', 'status'
    <% } %>
    <% if (features.includes('acoes')) { %>, 'acoes'<% } %>
  ];
  <% } %>

  <% if (features.includes('filtros')) { %>
  filters: any = {
    <% if (filters && filters.length > 0) { %>
      <% filters.forEach(function(filter, index) { %>
      <%= filter %>: ''<% if (index < filters.length - 1) { %>,<% } %>
      <% }); %>
    <% } else { %>
    nome: '',
    status: ''
    <% } %>
  };
  <% } %>

  <% if (features.includes('tabela')) { %>
  items: any[] = [
    <% if (columns && columns.length > 0) { %>
      <% columns.forEach(function(column, index) { %>
      { 
        <% columns.forEach(function(col, colIndex) { %>
        <%= col %>: '<%= getColumnDisplayName(col) %> <%= index + 1 %>'<% if (colIndex < columns.length - 1) { %>,<% } %>
        <% }); %>
      }<% if (index < 2) { %>,<% } %>
      <% }); %>
    <% } else { %>
    { id: 1, nome: 'Item 1', status: 'Ativo' },
    { id: 2, nome: 'Item 2', status: 'Inativo' },
    { id: 3, nome: 'Item 3', status: 'Ativo' }
    <% } %>
  ];

  totalItems = 0;
  pageSize = 10;
  <% } %>

  ngOnInit(): void {
    console.log('<%= className %> component initialized');
    <% if (features.includes('tabela')) { %>
    this.loadData();
    <% } %>
  }

  <% if (features.includes('tabela')) { %>
  loadData() {
    console.log('Carregando dados...');
    this.totalItems = this.items.length;
  }
  <% } %>

  <% if (features.includes('filtros')) { %>
  applyFilters() {
    console.log('Aplicando filtros:', this.filters);
  }

  clearFilters() {
    this.filters = {};
    this.searchTerm = '';
    console.log('Filtros limpos');
  }
  <% } %>

  <% if (features.includes('acoes')) { %>
  openCreateDialog() {
    console.log('Abrindo dialog de criação');
  }

  <% if (actions && actions.length > 0) { %>
    <% actions.forEach(function(action) { %>
  <%= action %>Item(item: any) {
    console.log('<%= getActionDisplayName(action) %> item:', item);
  }
    <% }); %>
  <% } else { %>
  editItem(item: any) {
    console.log('Editando item:', item);
  }

  deleteItem(item: any) {
    console.log('Excluindo item:', item);
  }

  viewItem(item: any) {
    console.log('Visualizando item:', item);
  }
  <% } %>
  <% } %>
} 