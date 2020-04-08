import { OnInit, Component } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
<<<<<<< HEAD
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
=======
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { async } from '@angular/core/testing';
>>>>>>> 3668f408d23edcfdaf25aef4404019ea9a60fc3b

export enum Documenttype {
  'Identite' = 'Pièce d’identité où permis de séjour',
  'OfficeDesPoursuites' = 'Attestation ORIGINALE de l’Office des poursuites',
  'AttestationDomicile' = 'Attestation de domicile',
  'FicheSalaire' = 'Fiches de salaire / dernière taxation définitive d’impôt'
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

  startDate = new Date(2020, 0, 1);
  localfiles = [];
  filename: string;
  input: HTMLElement;
  attachement: {filename: string, src: string, name: string, type: string }[] = [];
  parkingTypes = [
    'Parking exterieur',
    'Parking interne',
    'Garage'
  ];
  permisType = ['A', 'B', 'C', 'D', 'E', 'F'];
  public fileTypes = Object.values(Documenttype);
  downloadURL;
  snapshot: Observable<firebase.storage.UploadTaskSnapshot | undefined>;
  uploadTask: AngularFireUploadTask;

  constructor(
    private fb: FormBuilder,
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
      npa: this.fb.control(null, [Validators.required]),
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
      npa: this.fb.control(null, []),
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
      siOccupeParTitulaireOuCoTitulaire: this.fb.control('', [Validators.required]),
      nomsDuTitulaireOuCoTitulaire: this.fb.control('', [Validators.required]),
      occupantsAdultes: this.fb.control(null, [Validators.required]),
      occupantsEnfants: this.fb.control(null, []),
      animaux: this.fb.control('', []),
      siAnimaux: this.fb.control('', []),
      vehicules: this.fb.control('', []),
      noPlaques: this.fb.control('', []),
      siInstruments: this.fb.control('', []),
      instruments: this.fb.control('', []),
      siBailResilie: this.fb.control('', [Validators.required]),
      resiliePar: this.fb.control('', [Validators.required]),
      motifDuDemenagement: this.fb.control('', [Validators.required]),
      tosAgreement: this.fb.control('', [Validators.required]),
    });
  }

  submitForm() {
    const length  = this.localfiles.length;
    this.localfiles.map( async (singlefile, i) => {
      const filePath = `${singlefile.name}-${Date.now()}`;
      const uploadTask = await this.storage.upload(filePath, singlefile.file);
      const url = await uploadTask.ref.getDownloadURL();
      delete singlefile.file;
      this.attachement.push({...singlefile, src: url});
      if (length === i + 1) {
        const currentData = {
          immobilier: this.firstFormGroup.value,
          locataire: this.secondFormGroup.value,
          coTitulaire: this.thirdFormGroup.value,
          plusDetails: this.fourthFormGroup.value,
          attachement: this.attachement
        };

        this.orderService.SendOrder(currentData);
      }
    });
  }

  toUppercase() {
    const data = this.fourthFormGroup.value;
    const upperData = data.noPlaques.toUpperCase();
    this.fourthFormGroup.patchValue({noPlaques: upperData});
  }

  clickInput() {
    this.input = document.getElementById('file_upload');
    this.input.click();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      const filename = this.filename;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.localfiles.push({filename, src: event.target.result, name: file.name, type: file.type, file});
      };
    }
  }

  removeFile(file: any) {
    this.localfiles = this.localfiles.filter(item => item.name !== file);
  }
}
