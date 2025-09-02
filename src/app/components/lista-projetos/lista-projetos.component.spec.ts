import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ListaProjetosComponent } from './lista-projetos.component';
import { ProjetoService } from '../../services/projeto.service';
import { TarefaService } from '../../services/tarefa.service';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

describe('ListaProjetosComponent', () => {
  let component: ListaProjetosComponent;
  let fixture: ComponentFixture<ListaProjetosComponent>;
  let projetoServiceSpy: jasmine.SpyObj<ProjetoService>;
  let tarefaServiceSpy: jasmine.SpyObj<TarefaService>;

  beforeEach(async () => {
    projetoServiceSpy = jasmine.createSpyObj('ProjetoService', ['listar', 'criar', 'atualizar', 'remover']);
    tarefaServiceSpy  = jasmine.createSpyObj('TarefaService', ['removerTodasDoProjeto']);

    await TestBed.configureTestingModule({
      declarations: [
        ListaProjetosComponent,
      ],
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule
      ],
      providers: [
        { provide: ProjetoService, useValue: projetoServiceSpy },
        { provide: TarefaService, useValue: tarefaServiceSpy },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(null) }) } },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaProjetosComponent);
    component = fixture.componentInstance;

    projetoServiceSpy.listar.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar projetos', () => {
    const mockProjetos = [{ id: 1, nome: 'Projeto 1', descricao: 'Desc 1' }];
    projetoServiceSpy.listar.and.returnValue(of(mockProjetos));
    component.carregarProjetos();
    expect(component.projetos).toEqual(mockProjetos);
    expect(component.carregando).toBeFalse();
  });

  it('deve navegar para detalhes do projeto', () => {
    const router = TestBed.inject(Router);
    component.abrirProjeto(1);
    expect(router.navigate).toHaveBeenCalledWith(['/projects', 1]);
  });

  it('deve chamar removerProjeto e atualizar lista', fakeAsync(() => {
    // usuário confirma exclusão
    spyOn(window, 'confirm').and.returnValue(true);

    // mocks do fluxo de exclusão em cascata
    tarefaServiceSpy.removerTodasDoProjeto.and.returnValue(of(null));
    projetoServiceSpy.remover.and.returnValue(of(void 0));

    // quando atualizar a lista no finalize, retornar lista vazia (ou como preferir)
    projetoServiceSpy.listar.and.returnValue(of([]));
    projetoServiceSpy.listar.calls.reset(); // zera contagem por causa do ngOnInit

    const carregarSpy = spyOn(component, 'carregarProjetos').and.callThrough();

    component.removerProjeto(1);
    tick();

    expect(tarefaServiceSpy.removerTodasDoProjeto).toHaveBeenCalledOnceWith(1);
    expect(projetoServiceSpy.remover).toHaveBeenCalledOnceWith(1);
    expect(carregarSpy).toHaveBeenCalled();   
    expect(projetoServiceSpy.listar).toHaveBeenCalled(); 
  }));

  it('não deve remover se o usuário cancelar o confirm', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.removerProjeto(1);

    expect(tarefaServiceSpy.removerTodasDoProjeto).not.toHaveBeenCalled();
    expect(projetoServiceSpy.remover).not.toHaveBeenCalled();
  });

  it('deve abrir o dialog de novo projeto', () => {
    const dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(null) } as any);
    component.novoProjeto();
    expect(dialog.open).toHaveBeenCalled();
  });
});
