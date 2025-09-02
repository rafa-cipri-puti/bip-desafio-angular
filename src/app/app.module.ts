import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatDividerModule } from '@angular/material/divider';    


import { ListaProjetosComponent } from './components/lista-projetos/lista-projetos.component';
import { DetalheProjetoComponent } from './components/detalhe-projeto/detalhe-projeto.component';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';
import { FormProjetoComponent } from './components/form-projeto/form-projeto.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    ListaProjetosComponent,
    DetalheProjetoComponent,
    FormTarefaComponent,
    FormProjetoComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule, 
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatDividerModule 
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
   //, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // ATIVA O INTERCEPTOR
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }