import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjetoService } from './projeto.service';
import { Projeto } from '../models/projeto.model';

describe('ProjetoService', () => {
  let service: ProjetoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjetoService]
    });
    service = TestBed.inject(ProjetoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar projetos', () => {
    const mockProjetos: Projeto[] = [
      { id: 1, nome: 'Projeto 1', descricao: 'Desc 1' }
    ];

    service.listar().subscribe(projetos => {
      expect(projetos.length).toBe(1);
      expect(projetos).toEqual(mockProjetos);
    });

    const req = httpMock.expectOne('http://localhost:3000/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjetos);
  });

  it('deve buscar projeto por id', () => {
    const mockProjeto: Projeto = { id: 1, nome: 'Projeto 1', descricao: 'Desc 1' };

    service.buscarPorId(1).subscribe(projeto => {
      expect(projeto).toEqual(mockProjeto);
    });

    const req = httpMock.expectOne('http://localhost:3000/projects/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjeto);
  });

  it('deve criar projeto', () => {
    const novoProjeto: Projeto = { id: 2, nome: 'Projeto 2', descricao: 'Desc 2' };

    service.criar(novoProjeto).subscribe(projeto => {
      expect(projeto).toEqual(novoProjeto);
    });

    const req = httpMock.expectOne('http://localhost:3000/projects');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(novoProjeto);
    req.flush(novoProjeto);
  });

  it('deve atualizar projeto', () => {
    const projetoAtualizado: Projeto = { id: 1, nome: 'Projeto Atualizado', descricao: 'Desc Atualizada' };

    service.atualizar(1, projetoAtualizado).subscribe(projeto => {
      expect(projeto).toEqual(projetoAtualizado);
    });

    const req = httpMock.expectOne('http://localhost:3000/projects/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(projetoAtualizado);
    req.flush(projetoAtualizado);
  });

  it('deve remover projeto', () => {
    service.remover(1).subscribe(response => {
      expect(response).toBeNull(); 
    });

    const req = httpMock.expectOne('http://localhost:3000/projects/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});