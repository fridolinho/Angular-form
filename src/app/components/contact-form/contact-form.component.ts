import {OnInit, Component, ViewChild} from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatRadioChange } from '@angular/material/radio';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

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

  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;
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
    'No parking',
    'Parking exterieur',
    'Parking interne',
    'Garage'
  ];
  permisType = ['A', 'B', 'C', 'D', 'E', 'F'];
  public fileTypes = Object.values(Documenttype);
  maxDate: Date;
  todayDate: Date;
  showTuteur = false;
  coLocatiare = false;
  disableSelect = false;
  showResiliePar = false;
  ammenagementStatus = true;
  visitDate = this.todayDate;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.todayDate = new Date(currentYear, currentMonth, currentDate);
  }

  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;

    this.firstFormGroup = this.fb.group({
      adresse: this.fb.control('Swiss', [Validators.required]),
      npa: this.fb.control(123, [Validators.required]),
      localite: this.fb.control('Geneva', [Validators.required]),
      piece: this.fb.control(2, [Validators.required]),
      etage: this.fb.control(3, [Validators.required]),
      precedentLoc: this.fb.control('Fridolin', []),
      loyerNet: this.fb.control(2500, [Validators.min(0), Validators.required]),
      charges: this.fb.control(200, [Validators.min(0), Validators.required]),
      referenceObjet: this.fb.control('ID003/2017', [Validators.required]),
      parking: this.fb.control('Parking exterieur', []),
      dateDemmenagementSouhaitee: this.fb.control('', [Validators.required]),
      dateDeVisite: this.fb.control('', [Validators.required]),
    });

    this.secondFormGroup = this.fb.group({
      genre: this.fb.control('male', [Validators.required]),
      nom: this.fb.control('Niyonsaba', [Validators.required]),
      prenom: this.fb.control('Fridolin', [Validators.required]),
      adresseActuelle: this.fb.control('Kigali', [Validators.required]),
      adresseLegale: this.fb.control(''),
      npa: this.fb.control(203, [Validators.min(0), Validators.required]),
      localite: this.fb.control('kg198', [Validators.min(0), Validators.required]),
      nationalite: this.fb.control('Rwanda', [Validators.required]),
      permis: this.fb.control('B', []),
      lieuOrigine: this.fb.control('Kimironko', [Validators.required]),
      dateDeNaissance: this.fb.control('', [Validators.required]),
      etatCivil: this.fb.control('Single', [Validators.required]),
      telephoneFixe: this.fb.control(null, []),
      telephoneProfessionel: this.fb.control('', []),
      portable: this.fb.control('0788232369', [Validators.required]),
      email: this.fb.control('fridolinho@gmail.com', [Validators.required, Validators.email]),
      profession: this.fb.control('Software engineer', [Validators.required]),
      employeur: this.fb.control('Koalito SARL', []),
      depuis: this.fb.control('', []),
      revenueMensuel: this.fb.control(3000, [Validators.min(0), Validators.required]),
      geranceActuelle: this.fb.control('John Doe', [Validators.required]),
      loyerActuelle: this.fb.control(1300, [Validators.min(0), Validators.required]),
      charges: this.fb.control(240, [Validators.min(0), Validators.required]),
      poursuites: this.fb.control('oui', [Validators.required]),
      protection: this.fb.control('non', [Validators.required]),
      siTuteur: this.fb.control('', []),
    });

    this.thirdFormGroup = this.fb.group({
      coTitulaire: this.fb.control('', []),
      nom: this.fb.control('', []),
      prenom: this.fb.control('', []),
      adresseActuelle: this.fb.control('', []),
      adresseSiDifferente: this.fb.control(''),

      npa: this.fb.control(null, [Validators.min(0)]),
      localite: this.fb.control(null, [Validators.min(0)]),
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
      revenueMensuel: this.fb.control(null, [Validators.min(0)]),
      geranceActuelle: this.fb.control('', []),
      loyerActuelle: this.fb.control(null, [Validators.min(0)]),
      charges: this.fb.control(null, [Validators.min(0)]),
      poursuites: this.fb.control('', []),
      protection: this.fb.control('', []),
    });

    this.fourthFormGroup = this.fb.group({
      logement: this.fb.control('', [Validators.required]),
      siOccupeParTitulaireOuCoTitulaire: this.fb.control('', [Validators.required]),
      nomsDuTitulaireOuCoTitulaire: this.fb.control('', [Validators.required]),
      occupantsAdultes: this.fb.control(2, [Validators.min(0), Validators.required]),
      occupantsEnfants: this.fb.control(null, [Validators.min(0)]),
      animaux: this.fb.control('', []),
      siAnimaux: this.fb.control('', []),
      vehicules: this.fb.control('', []),
      noPlaques: this.fb.control('', []),
      siInstruments: this.fb.control('', []),
      instruments: this.fb.control('', []),
      siBailResilie: this.fb.control('', []),
      resiliePar: this.fb.control('', [Validators.required]),
      motifDuDemenagement: this.fb.control('Work reason related', [Validators.required]),
      tosAgreement: this.fb.control('', [Validators.required]),
    });
  }

  submitForm() {
    const button = document.getElementById('submit-form');
    button.classList.add('spin');
    const invalidControl = document.getElementsByClassName('ng-invalid');
    if (invalidControl.length > 0) {
      button.classList.remove('spin');
      this.toastr. error('Formulaire invalide!');
      return;
    }
    // document.getElementById('submit-form').classList.add('spin');
    const length  = this.localfiles.length;
    this.localfiles.map( async (singlefile, i) => {
      const filePath = `${singlefile.name}-${Date.now()}`;
      const uploadTask = await this.storage.upload(filePath, singlefile.file);
      const url = await uploadTask.ref.getDownloadURL();

      delete singlefile.file;
      this.attachement.push({...singlefile, src: url});
      if (length === i + 1) {
        this.firstFormGroup.patchValue({dateDemmenagementSouhaitee: this.firstFormGroup.value.dateDemmenagementSouhaitee.valueOf()});
        this.firstFormGroup.patchValue({dateDeVisite: this.firstFormGroup.value.dateDeVisite.valueOf()});
        this.secondFormGroup.patchValue({dateDeNaissance: this.secondFormGroup.value.dateDeNaissance.valueOf()});
        if (this.secondFormGroup.value.depuis !== '') {
          this.secondFormGroup.patchValue({depuis: this.secondFormGroup.value.depuis.valueOf()});
        }
        if (this.thirdFormGroup.value.dateDeVisite !== '') {
          this.thirdFormGroup.patchValue({dateDeNaissance: this.thirdFormGroup.value.dateDeNaissance.valueOf()});
        }
        if (this.thirdFormGroup.value.depuis !== '') {
          this.thirdFormGroup.patchValue({depuis: this.thirdFormGroup.value.depuis.valueOf()});
        }
        const currentData = {
          immobilier: this.firstFormGroup.value,
          locataire: this.secondFormGroup.value,
          coTitulaire: this.thirdFormGroup.value,
          plusDetails: this.fourthFormGroup.value,
          attachement: this.attachement
        };
        try {
          this.orderService.SendOrder(currentData);
          button.classList.remove('spin');
          this.toastr. success('Succès soumis!');
        } catch (error) {
          button.classList.remove('spin');
          this.toastr. error( error);
        }
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
      reader.onload = (uploadEvent) => { // called once readAsDataURL is completed
        this.localfiles.push({filename, src: event.target.result, name: file.name, type: file.type, file});
      };
    }
  }

  removeFile(file: any) {
    this.localfiles = this.localfiles.filter(item => item.name !== file);
  }

  showTuteurInput() {
     this.showTuteur = !this.showTuteur;
  }

  showColocataireTab() {
   this.coLocatiare = !this.coLocatiare;
  }

  checkCountry(event) {
    if (event.target.value.toLowerCase() === 'suisse') {
      this.disableSelect = true;
    }
  }

  updateOccupant(event) {
    const titulaire = this.thirdFormGroup.value.nom + ' ' + this.thirdFormGroup.value.prenom;
    const locataire = this.secondFormGroup.value.nom + ' ' + this.secondFormGroup.value.prenom;
    if (event.value === 'oui') {
      this.fourthFormGroup.patchValue({nomsDuTitulaireOuCoTitulaire: locataire});
    } else {
      this.fourthFormGroup.patchValue({nomsDuTitulaireOuCoTitulaire: titulaire});
    }
  }

  showResilier(event) {
    console.log(event.value);
    if (event.value === 'oui') {
      this.showResiliePar = true;
    } else {
      this.showResiliePar = false;
    }
  }

  enableAmmenagement(event) {
    if (event.target.value !== '') {
      this.ammenagementStatus = false;
      this.visitDate = event.target.value.toDate();
    } else {
      this.ammenagementStatus = true;
    }
  }
}
