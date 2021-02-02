import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CargaImagenesService {
    /* Variables */
    private CARPETA_IMAGENES = 'img';

    /* Constructor */
    constructor(
        private db: AngularFirestore,
        private storage: AngularFireStorage
    ) {}

    /* Metodos */
    private guardarImagen(imagen: { nombre: string; url: string }) {
        this.db.collection(`${this.CARPETA_IMAGENES}`).add(imagen);
    }

    cargarImagenesFirebase(imagenes: FileItem[]) {
        // console.log(imagenes);
        // const storageRef = this.storage().ref();

        for (const item of imagenes) {
            item.estaSubiendo = true;
            if (item.progreso >= 100) {
                continue;
            }
            const file = item.archivo;
            const filePath = `${this.CARPETA_IMAGENES}/${item.nombreArchivo}`;
            const fileRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, file);

            // Con esta función nos suscribimos a los cambios en el progreso
            uploadTask
                .percentageChanges()
                .subscribe((resp) => (item.progreso = resp));
            // Se obtiene el url de descarga cuando este disponible
            uploadTask
                .snapshotChanges()
                .pipe(
                    finalize(() =>
                        fileRef.getDownloadURL().subscribe((url) => {
                            console.log('Imagen cargada con exito');
                            item.url = url;
                            item.estaSubiendo = false;
                            this.guardarImagen({
                                nombre: item.nombreArchivo,
                                url: item.url,
                            });
                        })
                    )
                )
                .subscribe();
        }
    }
}
