import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultor } from '../models/consultor.model';
import { API_CONFIG } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ConsultorService {
  private consultoresApi = `${API_CONFIG.baseUrl}/consultores`; 

  constructor(private http: HttpClient) {}

  getConsultores(): Observable<Consultor[]> {
    return this.http.get<Consultor[]>(this.consultoresApi);
  }

  getConsultorById(id: number): Observable<Consultor> {
    return this.http.get<Consultor>(`${this.consultoresApi}/${id}`);
  }

  adicionarConsultor(consultor: Consultor): Observable<Consultor> {
    return this.http.post<Consultor>(this.consultoresApi, consultor);
  }

  editarConsultor(id: number, consultor: Consultor): Observable<Consultor> {
    return this.http.put<Consultor>(`${this.consultoresApi}/${id}`, consultor);
  }

  excluirConsultor(id: number): Observable<Consultor> {
    return this.http.delete<Consultor>(`${this.consultoresApi}/${id}`)
  }

  getAreas(): string[] {
    return ['Tecnologia', 'Marketing', 'Recursos Humanos', 'Finanças', 'Design', 'Consultoria', 'Vendas', 'Operações'];
  }
}