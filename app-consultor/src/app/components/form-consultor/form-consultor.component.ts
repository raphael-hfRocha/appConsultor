import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultorService } from '../../services/consultor.service';
import { Consultor } from '../../models/consultor.model';

@Component({
  selector: 'app-form-consultor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <div class="form-card">
        <div class="form-header">
          <h2>{{ isEdicao ? 'Editar Consultor' : 'Novo Consultor' }}</h2>
          <button class="btn btn-secondary" (click)="voltar()">
            ← Voltar
          </button>
        </div>

        <form [formGroup]="consultorForm" (ngSubmit)="onSubmit()">
          <div class="form-row">
            <div class="form-group">
              <label for="nome">Nome *</label>
              <input 
                type="text" 
                id="nome" 
                formControlName="nome"
                class="form-control"
                [class.is-invalid]="consultorForm.get('nome')?.invalid && consultorForm.get('nome')?.touched"
              >
              <div class="invalid-feedback" *ngIf="consultorForm.get('nome')?.invalid && consultorForm.get('nome')?.touched">
                Nome é obrigatório
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                class="form-control"
                [class.is-invalid]="consultorForm.get('email')?.invalid && consultorForm.get('email')?.touched"
              >
              <div class="invalid-feedback" *ngIf="consultorForm.get('email')?.invalid && consultorForm.get('email')?.touched">
                <span *ngIf="consultorForm.get('email')?.errors?.['required']">Email é obrigatório</span>
                <span *ngIf="consultorForm.get('email')?.errors?.['email']">Email deve ser válido</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="telefone">Telefone *</label>
              <input 
                type="tel" 
                id="telefone" 
                formControlName="telefone"
                class="form-control"
                placeholder="(00) 00000-0000"
                [class.is-invalid]="consultorForm.get('telefone')?.invalid && consultorForm.get('telefone')?.touched"
              >
              <div class="invalid-feedback" *ngIf="consultorForm.get('telefone')?.invalid && consultorForm.get('telefone')?.touched">
                Telefone é obrigatório
              </div>
            </div>

            <div class="form-group">
              <label for="area">Área *</label>
              <select 
                id="area" 
                formControlName="area"
                class="form-control"
                [class.is-invalid]="consultorForm.get('area')?.invalid && consultorForm.get('area')?.touched"
              >
                <option value="">Selecione uma área</option>
                <option *ngFor="let area of areas" [value]="area">{{ area }}</option>
              </select>
              <div class="invalid-feedback" *ngIf="consultorForm.get('area')?.invalid && consultorForm.get('area')?.touched">
                Área é obrigatória
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="experiencia">Experiência (anos) *</label>
              <input 
                type="number" 
                id="experiencia" 
                formControlName="experiencia"
                class="form-control"
                min="0"
                max="50"
                [class.is-invalid]="consultorForm.get('experiencia')?.invalid && consultorForm.get('experiencia')?.touched"
              >
              <div class="invalid-feedback" *ngIf="consultorForm.get('experiencia')?.invalid && consultorForm.get('experiencia')?.touched">
                <span *ngIf="consultorForm.get('experiencia')?.errors?.['required']">Experiência é obrigatória</span>
                <span *ngIf="consultorForm.get('experiencia')?.errors?.['min']">Experiência deve ser maior que 0</span>
                <span *ngIf="consultorForm.get('experiencia')?.errors?.['max']">Experiência deve ser menor que 50 anos</span>
              </div>
            </div>

            <div class="form-group">
              <label for="tarifa">Tarifa (R$/hora) *</label>
              <input 
                type="number" 
                id="tarifa" 
                formControlName="tarifa"
                class="form-control"
                min="0"
                step="0.01"
                [class.is-invalid]="consultorForm.get('tarifa')?.invalid && consultorForm.get('tarifa')?.touched"
              >
              <div class="invalid-feedback" *ngIf="consultorForm.get('tarifa')?.invalid && consultorForm.get('tarifa')?.touched">
                <span *ngIf="consultorForm.get('tarifa')?.errors?.['required']">Tarifa é obrigatória</span>
                <span *ngIf="consultorForm.get('tarifa')?.errors?.['min']">Tarifa deve ser maior que 0</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  formControlName="disponivel"
                  class="checkbox"
                >
                <span class="checkmark"></span>
                Disponível para novos projetos
              </label>
            </div>
          </div>

          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea 
              id="descricao" 
              formControlName="descricao"
              class="form-control"
              rows="4"
              placeholder="Breve descrição sobre a experiência e especialidades..."
            ></textarea>
          </div>

          <div class="form-actions">
            <button 
              type="button" 
              class="btn btn-secondary"
              (click)="voltar()"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="consultorForm.invalid || loading"
            >
              {{ loading ? 'Salvando...' : (isEdicao ? 'Atualizar' : 'Cadastrar') }}
            </button>
          </div>

          <div class="alert alert-danger" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .form-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 30px;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #eee;
    }

    h2 {
      margin: 0;
      color: #333;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.checkbox-group {
      grid-column: 1 / -1;
    }

    label {
      margin-bottom: 8px;
      font-weight: 500;
      color: #555;
    }

    .form-control {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: normal !important;
    }

    .checkbox {
      margin-right: 10px;
      transform: scale(1.2);
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      min-width: 120px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .alert {
      padding: 12px;
      border-radius: 6px;
      margin-top: 20px;
    }

    .alert-danger {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .form-header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class FormConsultorComponent implements OnInit {
  @Input() consultorId?: number;
  @Output() consultorSalvo = new EventEmitter<Consultor>();
  @Output() cancelar = new EventEmitter<void>();

  consultorForm: FormGroup;
  areas: string[] = [];
  loading = false;
  errorMessage = '';
  isEdicao = false;

  constructor(
    private formBuilder: FormBuilder,
    private consultorService: ConsultorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.consultorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      area: ['', Validators.required],
      experiencia: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      tarifa: [0, [Validators.required, Validators.min(0)]],
      disponivel: [true],
      descricao: ['']
    });
  }

  ngOnInit(): void {
    this.areas = this.consultorService.getAreas();
    
    // Verifica se é edição através da rota
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.consultorId = +id;
      this.isEdicao = true;
      this.carregarConsultor();
    }
  }

  carregarConsultor(): void {
    if (this.consultorId) {
      this.consultorService.getConsultorById(this.consultorId).subscribe(consultor => {
        if (consultor) {
          this.consultorForm.patchValue({
            nome: consultor.nome,
            email: consultor.email,
            telefone: consultor.telefone,
            area: consultor.area,
            experiencia: consultor.experiencia,
            tarifa: consultor.tarifa,
            disponivel: consultor.disponivel,
            descricao: consultor.descricao || ''
          });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.consultorForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const consultorData = this.consultorForm.value;

      if (this.isEdicao && this.consultorId) {
        this.consultorService.editarConsultor(this.consultorId, consultorData).subscribe({
          next: (consultor) => {
            this.loading = false;
            if (consultor) {
              this.consultorSalvo.emit(consultor);
              this.router.navigate(['/consultores']);
            } else {
              this.errorMessage = 'Erro ao atualizar consultor';
            }
          },
          error: () => {
            this.loading = false;
            this.errorMessage = 'Erro ao atualizar consultor. Tente novamente.';
          }
        });
      } else {
        this.consultorService.adicionarConsultor(consultorData).subscribe({
          next: (consultor) => {
            this.loading = false;
            this.consultorSalvo.emit(consultor);
            this.router.navigate(['/consultores']);
          },
          error: () => {
            this.loading = false;
            this.errorMessage = 'Erro ao cadastrar consultor. Tente novamente.';
          }
        });
      }
    }
  }

  voltar(): void {
    this.cancelar.emit();
    this.router.navigate(['/consultores']);
  }
}