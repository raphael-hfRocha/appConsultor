import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultorService } from '../../services/consultor.service';
import { AuthService } from '../../services/auth.service';
import { Consultor } from '../../models/consultor.model';

@Component({
  selector: 'app-lista-consultores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="lista-container">
      <div class="header">
        <h2>Lista de Consultores</h2>
        <button 
          *ngIf="isAdmin"
          class="btn btn-primary"
          (click)="navegarParaCadastro()"
        >
          <i class="icon">+</i> Novo Consultor
        </button>
      </div>

      <!-- Filtros -->
      <div class="filtros">
        <div class="filtro-group">
          <label for="filtroArea">Área:</label>
          <select id="filtroArea" [(ngModel)]="filtroArea" (change)="aplicarFiltros()" class="form-control">
            <option value="">Todas as áreas</option>
            <option *ngFor="let area of areas" [value]="area">{{ area }}</option>
          </select>
        </div>
        
        <div class="filtro-group">
          <label for="filtroDisponibilidade">Disponibilidade:</label>
          <select id="filtroDisponibilidade" [(ngModel)]="filtroDisponibilidade" (change)="aplicarFiltros()" class="form-control">
            <option value="">Todos</option>
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
          </select>
        </div>

        <div class="filtro-group">
          <label for="busca">Buscar:</label>
          <input 
            type="text" 
            id="busca"
            [(ngModel)]="termoBusca" 
            (input)="aplicarFiltros()"
            placeholder="Nome ou email..."
            class="form-control"
          >
        </div>
      </div>

      <!-- Lista de consultores -->
      <div class="consultores-grid" *ngIf="consultoresFiltrados.length > 0">
        <div 
          *ngFor="let consultor of consultoresFiltrados" 
          class="consultor-card"
          [class.indisponivel]="!consultor.disponivel"
        >
          <div class="consultor-header">
            <h3>{{ consultor.nome }}</h3>
            <span class="status" [class.disponivel]="consultor.disponivel">
              {{ consultor.disponivel ? 'Disponível' : 'Indisponível' }}
            </span>
          </div>
          
          <div class="consultor-info">
            <p><strong>Email:</strong> {{ consultor.email }}</p>
            <p><strong>Telefone:</strong> {{ consultor.telefone }}</p>
            <p><strong>Área:</strong> {{ consultor.area }}</p>
            <p><strong>Experiência:</strong> {{ consultor.experiencia }} anos</p>
            <p><strong>Tarifa:</strong> R$ {{ consultor.tarifa | number:'1.2-2' }}/hora</p>
            <p *ngIf="consultor.descricao" class="descricao">{{ consultor.descricao }}</p>
          </div>

          <div class="consultor-actions" *ngIf="isAdmin">
            <button 
              class="btn btn-secondary btn-sm"
              (click)="editarConsultor(consultor.id)"
            >
              Editar
            </button>
            <button 
              class="btn btn-danger btn-sm"
              (click)="confirmarExclusao(consultor)"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      <div class="no-results" *ngIf="consultoresFiltrados.length === 0">
        <p>Nenhum consultor encontrado com os filtros aplicados.</p>
      </div>

      <!-- Modal de confirmação de exclusão -->
      <div class="modal" *ngIf="consultorParaExcluir" (click)="cancelarExclusao()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Confirmar Exclusão</h3>
          <p>Tem certeza que deseja excluir o consultor <strong>{{ consultorParaExcluir.nome }}</strong>?</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" (click)="cancelarExclusao()">Cancelar</button>
            <button class="btn btn-danger" (click)="excluirConsultor()">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .lista-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #eee;
    }

    h2 {
      color: #333;
      margin: 0;
    }

    .filtros {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .filtro-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #555;
    }

    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }

    .consultores-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }

    .consultor-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .consultor-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .consultor-card.indisponivel {
      opacity: 0.7;
      background: #f8f9fa;
    }

    .consultor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    .consultor-header h3 {
      margin: 0;
      color: #333;
      font-size: 1.2rem;
    }

    .status {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      background: #dc3545;
      color: white;
    }

    .status.disponivel {
      background: #28a745;
    }

    .consultor-info p {
      margin: 8px 0;
      font-size: 0.9rem;
      color: #666;
    }

    .descricao {
      font-style: italic;
      color: #777 !important;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #eee;
    }

    .consultor-actions {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
      display: flex;
      gap: 10px;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 12px;
    }

    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .icon {
      font-weight: bold;
      margin-right: 5px;
    }

    .no-results {
      text-align: center;
      padding: 40px;
      color: #666;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      min-width: 400px;
      max-width: 90vw;
    }

    .modal-content h3 {
      margin-top: 0;
      color: #333;
    }

    .modal-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `]
})
export class ListaConsultoresComponent implements OnInit {
  @Output() editarConsultorEvent = new EventEmitter<number>();
  
  consultores: Consultor[] = [];
  consultoresFiltrados: Consultor[] = [];
  areas: string[] = [];
  isAdmin = false;

  // Filtros
  filtroArea = '';
  filtroDisponibilidade = '';
  termoBusca = '';

  // Modal de exclusão
  consultorParaExcluir: Consultor | null = null;

  constructor(
    private consultorService: ConsultorService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.areas = this.consultorService.getAreas();
    this.carregarConsultores();
  }

  carregarConsultores(): void {
    this.consultorService.getConsultores().subscribe(consultores => {
      this.consultores = consultores;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    this.consultoresFiltrados = this.consultores.filter(consultor => {
      // Filtro por área
      if (this.filtroArea && consultor.area !== this.filtroArea) {
        return false;
      }

      // Filtro por disponibilidade
      if (this.filtroDisponibilidade !== '') {
        if (this.filtroDisponibilidade === 'true' && !consultor.disponivel) {
          return false;
        }
        if (this.filtroDisponibilidade === 'false' && consultor.disponivel) {
          return false;
        }
      }

      // Filtro por busca
      if (this.termoBusca) {
        const termo = this.termoBusca.toLowerCase();
        return consultor.nome.toLowerCase().includes(termo) ||
               consultor.email.toLowerCase().includes(termo);
      }

      return true;
    });
  }

  navegarParaCadastro(): void {
    this.router.navigate(['/consultor/novo']);
  }

  editarConsultor(id: number): void {
    this.router.navigate(['/consultor/editar', id]);
  }

  confirmarExclusao(consultor: Consultor): void {
    this.consultorParaExcluir = consultor;
  }

  cancelarExclusao(): void {
    this.consultorParaExcluir = null;
  }

  excluirConsultor(): void {
    if (this.consultorParaExcluir) {
      this.consultorService.excluirConsultor(this.consultorParaExcluir.id).subscribe(sucesso => {
        if (sucesso) {
          this.carregarConsultores();
        }
        this.consultorParaExcluir = null;
      });
    }
  }
}