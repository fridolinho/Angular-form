import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  localfiles = [];
  files = [];
  input: HTMLElement;
  filename: string;
  constructor(
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      const filename = this.filename;
      const filePath = `file-${Date.now()}`;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.localfiles.push({filename, src: event.target.result, type: file.type, name: file.name});
        const task = this.storage.upload(filePath, file);
        task.then(async (snapshot) => {
          // const src = await snapshot.ref.getDownloadURL();
          // this.files.push({filename, src, name: file.name});
        }).catch((error) => {
          console.error(error);
        });
      };
    }
  }

  removeFile(file: any) {
    console.log(file);
    this.localfiles = this.localfiles.filter(item => item.name !== file);
  }

  clickInput() {
    this.input = document.getElementById('file_upload');
    this.input.click();
  }
}
