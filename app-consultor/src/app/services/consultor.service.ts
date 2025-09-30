import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Consultor } from '../models/consultor.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultorService {
  private consultoresSubject = new BehaviorSubject<Consultor[]>([]);
  public consultores$ = this.consultoresSubject.asObservable();
  private nextId = 6;

  // Dados mocados iniciais
  private consultoresMocados: Consultor[] = [
    {
      id: 1,
      nome: 'Maria Silva',
      email: 'maria.silva@email.com',
      telefone: '(11) 99999-0001',
      area: 'Tecnologia',
      experiencia: 5,
      tarifa: 150.00,
      disponivel: true,
      descricao: 'Especialista em desenvolvimento web e mobile',
      criadoEm: new Date('2024-01-15'),
      atualizadoEm: new Date('2024-01-15')
    },
    {
      id: 2,
      nome: 'João Santos',
      email: 'joao.santos@email.com',
      telefone: '(11) 99999-0002',
      area: 'Marketing',
      experiencia: 8,
      tarifa: 200.00,
      disponivel: true,
      descricao: 'Consultor em marketing digital e estratégias de crescimento',
      criadoEm: new Date('2024-02-10'),
      atualizadoEm: new Date('2024-02-10')
    },
    {
      id: 3,
      nome: 'Ana Costa',
      email: 'ana.costa@email.com',
      telefone: '(11) 99999-0003',
      area: 'Recursos Humanos',
      experiencia: 12,
      tarifa: 180.00,
      disponivel: false,
      descricao: 'Especialista em gestão de pessoas e recrutamento',
      criadoEm: new Date('2024-01-20'),
      atualizadoEm: new Date('2024-03-05')
    },
    {
      id: 4,
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      telefone: '(11) 99999-0004',
      area: 'Finanças',
      experiencia: 15,
      tarifa: 250.00,
      disponivel: true,
      descricao: 'Consultor financeiro e planejamento estratégico',
      criadoEm: new Date('2023-12-01'),
      atualizadoEm: new Date('2024-01-10')
    },
    {
      id: 5,
      nome: 'Fernanda Lima',
      email: 'fernanda.lima@email.com',
      telefone: '(11) 99999-0005',
      area: 'Design',
      experiencia: 7,
      tarifa: 160.00,
      disponivel: true,
      descricao: 'Designer UX/UI e consultor em experiência do usuário',
      criadoEm: new Date('2024-02-28'),
      atualizadoEm: new Date('2024-02-28')
    }
  ];

  constructor() {
    this.consultoresSubject.next(this.consultoresMocados);
  }

  getConsultores(): Observable<Consultor[]> {
    return this.consultores$;
  }

  getConsultorById(id: number): Observable<Consultor | undefined> {
    const consultor = this.consultoresSubject.value.find(c => c.id === id);
    return of(consultor);
  }

  adicionarConsultor(consultor: Omit<Consultor, 'id' | 'criadoEm' | 'atualizadoEm'>): Observable<Consultor> {
    const novoConsultor: Consultor = {
      ...consultor,
      id: this.nextId++,
      criadoEm: new Date(),
      atualizadoEm: new Date()
    };

    const consultoresAtuais = this.consultoresSubject.value;
    this.consultoresSubject.next([...consultoresAtuais, novoConsultor]);
    
    return of(novoConsultor);
  }

  editarConsultor(id: number, consultor: Partial<Consultor>): Observable<Consultor | null> {
    const consultoresAtuais = this.consultoresSubject.value;
    const index = consultoresAtuais.findIndex(c => c.id === id);
    
    if (index !== -1) {
      const consultorAtualizado: Consultor = {
        ...consultoresAtuais[index],
        ...consultor,
        atualizadoEm: new Date()
      };
      
      consultoresAtuais[index] = consultorAtualizado;
      this.consultoresSubject.next([...consultoresAtuais]);
      
      return of(consultorAtualizado);
    }
    
    return of(null);
  }

  excluirConsultor(id: number): Observable<boolean> {
    const consultoresAtuais = this.consultoresSubject.value;
    const consultoresFiltrados = consultoresAtuais.filter(c => c.id !== id);
    
    if (consultoresFiltrados.length !== consultoresAtuais.length) {
      this.consultoresSubject.next(consultoresFiltrados);
      return of(true);
    }
    
    return of(false);
  }

  getAreas(): string[] {
    return ['Tecnologia', 'Marketing', 'Recursos Humanos', 'Finanças', 'Design', 'Consultoria', 'Vendas', 'Operações'];
  }
}