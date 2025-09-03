import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AreaFilterPipe } from './area-filter.pipe';


export interface Consultor {
  id: number,
  nome: string,
  email: string,
  telefone?: string,
  area: string,
  ativo: boolean,
  experiencia: number,
  readonly dataContrato: Date
}

interface Estatistica {
  totalConsultores: number,
  consultoresAtivos: number,
  consultoresInativos: number,
  mediaExperiencia: number
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, AreaFilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Lista de consultores';
  areaEscolhida: string = '';
  consultores: Consultor[] = [
    {
      id: 1,
      nome: 'Raphael Henrique Fernandes Rocha',
      email: 'raphaelrochaacft@gmail.com',
      telefone: '(11) 94534-5479',
      ativo: true,
      area: 'TI',
      experiencia: 10,
      dataContrato: new Date('2023-08-22')
    },
    {
      id: 2,
      nome: 'Regina Clara Novaes',
      email: 'reginanovaes@gmail.com',
      telefone: '(11) 98256-6374',
      ativo: true,
      area: 'Segurança',
      experiencia: 6,
      dataContrato: new Date('2020-02-04')
    },
    {
      id: 3,
      nome: 'Nathan Heitor Gonçalves',
      email: 'nathangoncalves@gmail.com',
      telefone: '(11) 98677-6430',
      ativo: true,
      area: 'Arquitetura',
      experiencia: 2,
      dataContrato: new Date('2020-12-01')
    },
    {
      id: 4,
      nome: 'Jéssica Alessandra Rosa Duarte',
      email: 'jessicaduarte@gmail.com',
      telefone: '(11) 98145-4512',
      ativo: false,
      area: 'Engenharia',
      experiencia: 1,
      dataContrato: new Date('2023-06-25')
    },
    {
      id: 5,
      nome: 'Valentina Bruna Monteiro',
      email: 'valentinamonteiro@gmail.com',
      telefone: '(11) 99627-7841',
      ativo: false,
      area: 'Direito',
      experiencia: 3,
      dataContrato: new Date('2021-10-10')
    },
    {
      id: 6,
      nome: 'Joaquim Ryan Francisco Peixoto',
      email: 'joaquimpeixoto@gmail.com',
      telefone: '(11) 98404-4560',
      ativo: false,
      area: 'TI',
      experiencia: 7,
      dataContrato: new Date('2022-01-25')
    },
    {
      id: 7,
      nome: 'Heloisa Julia de Paula',
      email: 'heloisapaula@gmail.com',
      telefone: '(11) 98159-5503',
      ativo: false,
      area: 'TI',
      experiencia: 5,
      dataContrato: new Date('2024-05-20')
    }
  ];

  get areasUnicas(): string[] {
    return [...new Set(this.consultores.map(c => c.area))];
  }
}

function totalConsultores(consultores: Consultor[]): Number {
  return consultores.length;
}

function consultoresAtivos(consultores: Consultor[]): Number {
  return consultores.filter(c => c.ativo).length
}

function consultoresInativos(consultores: Consultor[]): Number {
  return consultores.filter(c => !c.ativo).length
}

function calculoMediaExperiencia(consultores: Consultor[]): Number {
  const soma = consultores.reduce((total, consultor) => total + consultor.experiencia, 0);
  return Math.round(soma / consultores.length)
}

// function listaDadosEstatistica(): Estatistica {
//   return {
//     totalConsultores: totalConsultores(consultores),
//     consultoresAtivos: consultoresAtivos(listaConsultores),
//     consultoresInativos: consultoresInativos(listaConsultores),
//     mediaExperiencia: calculoMediaExperiencia(listaConsultores)
//   }
// }