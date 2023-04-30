import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Post } from '../models/post';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private storage: AngularFireStorage, private afs: AngularFirestore, private toastr: ToastrService, private router: Router ) { }


  uploadImage(selectedImage: any, postData: Post, formStatus: string, id: string) {
    const filePath = `postIMG/${Date.now()}`;

    console.log(filePath);

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Post image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        console.log(postData);

        if(formStatus == 'Edit'){
          this.updateData(id, postData);
        }else{
          this.saveData(postData);
        }

      })

    })

  }

  saveData(postData: Post) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data inserted successfully', 'Success');
      this.router.navigate(['/posts']);
    })
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, data }
        })
      })
    )
  }

  loadOneData(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }


  updateData(id: string, postData: Post) {
    this.afs.doc(`posts/${id}`).update(postData).then(() => {
      this.toastr.success('Data updated successfully', 'Success');
      this.router.navigate(['/posts']);
    })
  }

  deleteImage(postImgPath: string, id: string) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    })
  }

  deleteData(id: string){
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning('Data deleted...!', 'Success');
    })
  }

  markFeatured(id: string, featuredData: object) {
    this.afs.doc(`posts/${id}`).update(featuredData).then(() => {
      this.toastr.info('Featured status updated', 'success');
    })
  }

}
