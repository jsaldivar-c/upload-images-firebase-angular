import { Component } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-fotos',
    templateUrl: './fotos.component.html',
    styles: [],
})
export class FotosComponent {
    private itemsCollection: AngularFirestoreCollection<any>;
    items: Observable<any[]>;
    constructor(private afs: AngularFirestore) {
        this.itemsCollection = afs.collection<any>('img');
        this.items = this.itemsCollection.valueChanges();
    }
}
