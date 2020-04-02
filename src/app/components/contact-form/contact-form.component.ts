import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { async } from '@angular/core/testing';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  textFormControl =
    new FormControl('', [
        Validators.required,
        Validators.email,
      ]
    );

  matcher = new MyErrorStateMatcher();
  startDate = new Date(2020, 0, 1);
  localfiles = [];
  filename: string
  input: HTMLElement;
  attachement: {filename: string, src: string, name: string, type: string }[] = [];


  constructor(
    private fb: FormBuilder,
    db: AngularFireDatabase,
    private orderService: OrderService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      adresse: this.fb.control('', [Validators.required]),
      localite: this.fb.control(null, [Validators.required]),
      piece: this.fb.control(null, [Validators.required]),
      etage: this.fb.control(null, [Validators.required]),
      precedentLoc: this.fb.control('', [Validators.required]),
      loyerNet: this.fb.control(null, [Validators.required]),
      charges: this.fb.control(null, [Validators.required]),
      referenceObjet: this.fb.control('', [Validators.required]),
      parking: this.fb.control('', []),
      chfCharges: this.fb.control(null, []),
      dateDemmenagementSouhaitee: this.fb.control('', [Validators.required]),
      dateDeVisite: this.fb.control('', [Validators.required]),
    });

    this.secondFormGroup = this.fb.group({
      locataire: this.fb.control('', [Validators.required]),
      nom: this.fb.control('', [Validators.required]),
      prenom: this.fb.control('', [Validators.required]),
      adresseActuelle: this.fb.control('', [Validators.required]),
      adresseLegale: this.fb.control(''),
      NPALocalite: this.fb.control(null, [Validators.required]),
      nationalite: this.fb.control('', [Validators.required]),
      permis: this.fb.control('', []),
      lieuOrigine: this.fb.control('', [Validators.required]),
      dateDeNaissance: this.fb.control('', [Validators.required]),
      etatCivil: this.fb.control('', [Validators.required]),
      telephoneFixe: this.fb.control(null, []),
      telephoneProfessionel: this.fb.control('', []),
      portable: this.fb.control(null, [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      profession: this.fb.control('', [Validators.required]),
      employeur: this.fb.control('', []),
      depuis: this.fb.control('', []),
      revenueMensuel: this.fb.control(null, [Validators.required]),
      geranceActuelle: this.fb.control('', [Validators.required]),
      loyerActuelle: this.fb.control(null, [Validators.required]),
      charges: this.fb.control(null, [Validators.required]),
      poursuites: this.fb.control('', [Validators.required]),
      protection: this.fb.control('', [Validators.required]),
    });

    this.thirdFormGroup = this.fb.group({
      coTitulaire: this.fb.control('', []),
      nom: this.fb.control('', []),
      prenom: this.fb.control('', []),
      adresseActuelle: this.fb.control('', []),
      adresseSiDifferente: this.fb.control(''),
      NPALocalite: this.fb.control(null, []),
      nationalite: this.fb.control('', []),
      permis: this.fb.control('', []),
      lieuDorigine: this.fb.control('', []),
      dateDeNaissance: this.fb.control('', []),
      etatCivil: this.fb.control('', []),
      telephoneFixe: this.fb.control(null, []),
      telephoneProfessionel: this.fb.control(null, []),
      portable: this.fb.control(null, []),
      email: this.fb.control('', [Validators.email]),
      profession: this.fb.control('', []),
      employeur: this.fb.control('', []),
      depuis: this.fb.control('', []),
      revenueMensuel: this.fb.control(null, []),
      geranceActuelle: this.fb.control('', []),
      loyerActuelle: this.fb.control(null, []),
      charges: this.fb.control(null, []),
      poursuites: this.fb.control('', []),
      protection: this.fb.control('', []),
      siTuteur: this.fb.control('', []),
    });

    this.fourthFormGroup = this.fb.group({
      logement: this.fb.control('', [Validators.required]),
      siOccupéParTitulaireOuCoTitulaire: this.fb.control('', [Validators.required]),
      nomsDuTitulaireOuCoTitulaure: this.fb.control('', []),
      occupantsAdultes: this.fb.control(null, [Validators.required]),
      occupantsEnfants: this.fb.control(null, []),
      animaux: this.fb.control('', []),
      siAnimaux: this.fb.control('', []),
      vehicules: this.fb.control('', []),
      noPlaques: this.fb.control('', []),
      siInstruments: this.fb.control('', []),
      instruments: this.fb.control('', []),
      siBailRésilié: this.fb.control('', [Validators.required]),
      résilièPar: this.fb.control('', [Validators.required]),
      motifDuDéménagement: this.fb.control('', [Validators.required]),
      tosAgreement: this.fb.control('', [Validators.required]),
    });
  }

  submitForm() {
    const formData = {
      immobilier: this.firstFormGroup.value,
      locataire: this.secondFormGroup.value,
      coTitulaire: this.thirdFormGroup.value,
      plusDetails: this.fourthFormGroup.value,
      attachement: this.attachement
    };

    console.log(formData);
    this.orderService.SendOrder(formData);
  }

  numberOnly(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  clickInput() {
    this.input = document.getElementById('file_upload');
    this.input.click();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      const filePath = `file-${Date.now()}`;
      const filename = this.filename;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.localfiles.push({filename, src: event.target.result, name: file.name, type: file.type});
        const task = this.storage.upload(filePath, file);
        task.then(async (snapshot) => {
          const src = await snapshot.ref.getDownloadURL();
          this.attachement.push({filename, src, name: file.name, type: file.type});
        }).catch((error) => {
          console.error(error);
        });
      };
    }
  }

  removeFile(file: any) {
    console.log(file);
    this.localfiles = this.localfiles.filter(item => item.name !== file);
    this.attachement = this.attachement.filter(item => item.name !== file);
  }
}
