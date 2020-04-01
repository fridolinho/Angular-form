import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  images = [];
  files = [];
  input: HTMLElement;
  constructor(
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      const filePath = `image-${Date.now()}`;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.images.push({src: event.target.result});
        const task = this.storage.upload(filePath, file);
        task.then(async (snapshot) => {
          const src = await snapshot.ref.getDownloadURL();
          this.files.push({filename: 'image', src});
        }).catch((error) => {
          console.error(error);
        });
      };
    }
  }

  removeImage(image: any) {
    this.images = this.images.filter(item => item.src !== image.src);
  }

  uploadImg() {
    console.log(this.images);
  }

  clickInput() {
    this.input = document.getElementById('file_upload');
    this.input.click();
  }
}
