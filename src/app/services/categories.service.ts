import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../models/category';
import { map } from 'rxjs/operators';
import { ICategoryData } from '../models/category-data';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data: ICategory) {
    this.afs.collection('categories').add(data).then(docRef => {
      console.log(docRef);
      this.toastr.success('Data inserted successfully..!', 'success');
    })
    .catch(err => { console.log(err) });
  }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, data }
        })
      })
    )
  }

  updateData( id: string, editData: ICategory ) {
    this.afs.doc(`categories/${id}`).update(editData).then(docRef => {
      this.toastr.success('Data updated successfully..!', 'success');
    })
    .catch(err => { console.log(err) });
  }

  deleteData(id: string) {
    this.afs.doc(`categories/${id}`).delete().then(docRef => {
      this.toastr.success('Data deleted successfully..!', 'success');
    })
    .catch(err => { console.log(err) });
  }
}
