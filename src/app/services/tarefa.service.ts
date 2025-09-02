import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';
import { forkJoin, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  listarPorProjeto(projetoId: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}?projetoId=${projetoId}`);
  }

  listar(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  criar(tarefa: Omit<Tarefa, 'id'>) {
  return this.http.post<Tarefa>(this.apiUrl, tarefa);
}

  atualizar(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  removerTodasDoProjeto(projetoId: number) {
    return this.listarPorProjeto(projetoId).pipe(
      switchMap(tarefas => {
        if (!tarefas.length) return of(null);
        const deletes = tarefas.map(t => this.remover(t.id));
        return forkJoin(deletes).pipe(map(() => null));
      })
    );
  }


}