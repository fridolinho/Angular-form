import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  images = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.images.push({src: event.target.result});
      };
    }
  }

  removeImage(image: any) {
    this.images = this.images.filter(item => item.src !== image.src);
  }

  uploadImg() {
    console.log(this.images);
  }

}
