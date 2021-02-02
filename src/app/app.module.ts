import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { CargaImagenesService } from './services/carga-imagenes.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

@NgModule({
    declarations: [AppComponent, FotosComponent, CargaComponent, NgDropFilesDirective],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    providers: [CargaImagenesService],
    bootstrap: [AppComponent],
})
export class AppModule {}
