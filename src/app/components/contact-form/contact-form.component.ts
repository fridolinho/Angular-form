import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

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
  firebaseDb: AngularFireDatabase;

  textFormControl =
    new FormControl('', [
      Validators.required,
      Validators.email,
    ]
  );

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, db: AngularFireDatabase) {
    this.firebaseDb = db;
  }

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      adresse: this.fb.control('', [Validators.required]),
      localite: this.fb.control('', [Validators.required]),
      piece: this.fb.control('', [Validators.required]),
      etage: this.fb.control('', [Validators.required]),
      precedentLoc: this.fb.control('', [Validators.required]),
      loyerNet: this.fb.control('', [Validators.required]),
      charges: this.fb.control('', [Validators.required]),
      referenceObjet: this.fb.control('', [Validators.required]),
      siDisponible: this.fb.control('', [Validators.required]),
      chfCharges: this.fb.control('', [Validators.required]),
      dateDemmenagementSouhaitee: this.fb.control('', [Validators.required]),
      dateDeVisite: this.fb.control('', [Validators.required]),
    });

    this.secondFormGroup = this.fb.group({
      locataire: this.fb.control('', [Validators.required]),
      nom: this.fb.control('', [Validators.required]),
      prenom: this.fb.control('', [Validators.required]),
      adresseActuelle: this.fb.control('', [Validators.required]),
      adresseLegale: this.fb.control(''),
      NPALocalite: this.fb.control('', [Validators.required]),
      nationalite: this.fb.control('', [Validators.required]),
      permis: this.fb.control('', [Validators.required]),
      lieuOrigine: this.fb.control('', [Validators.required]),
      dateDeNaissance: this.fb.control('', [Validators.required]),
      etatCivil: this.fb.control('', [Validators.required]),
      telephoneFixe: this.fb.control('', [Validators.required]),
      telephoneProfessionel: this.fb.control('', [Validators.required]),
      portable: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      profession: this.fb.control('', [Validators.required]),
      employeur: this.fb.control('', [Validators.required]),
      depuis: this.fb.control('', [Validators.required]),
      revenueMensuel: this.fb.control('', [Validators.required]),
      geranceActuelle: this.fb.control('', [Validators.required]),
      loyerActuelle: this.fb.control('', [Validators.required]),
      charges: this.fb.control('', [Validators.required]),
      poursuites: this.fb.control('', [Validators.required]),
      protection: this.fb.control('', [Validators.required]),
    });
    this.thirdFormGroup = this.fb.group({
      coTitulaire: this.fb.control('', [Validators.required]),
      nom: this.fb.control('', [Validators.required]),
      prenom: this.fb.control('', [Validators.required]),
      adresseActuelle: this.fb.control('', [Validators.required]),
      adresseSiDifferente: this.fb.control(''),
      NPALocalite: this.fb.control('', [Validators.required]),
      nationalite: this.fb.control('', [Validators.required]),
      permis: this.fb.control('', [Validators.required]),
      lieuDorigine: this.fb.control('', [Validators.required]),
      dateDeNaissance: this.fb.control('', [Validators.required]),
      etatCivil: this.fb.control('', [Validators.required]),
      telephoneFixe: this.fb.control('', [Validators.required]),
      telephoneProfessionel: this.fb.control('', [Validators.required]),
      portable: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      profession: this.fb.control('', [Validators.required]),
      employeur: this.fb.control('', [Validators.required]),
      depuis: this.fb.control('', [Validators.required]),
      revenueMensuel: this.fb.control('', [Validators.required]),
      geranceActuelle: this.fb.control('', [Validators.required]),
      loyerActuelle: this.fb.control('', [Validators.required]),
      charges: this.fb.control('', [Validators.required]),
      poursuites: this.fb.control('', [Validators.required]),
      protection: this.fb.control('', [Validators.required]),
      siTuteur: this.fb.control('', [Validators.required]),
    });

    this.fourthFormGroup = this.fb.group({
      logement: this.fb.control('', [Validators.required]),
      siOccupéParTitulaireOuCoTitulaire: this.fb.control('', [Validators.required]),
      nomsDuTitulaireOuCoTitulaure: this.fb.control('', [Validators.required]),
      occupantsAdultes: this.fb.control('', [Validators.required]),
      occupantsEnfants: this.fb.control('', [Validators.required]),
      animaux: this.fb.control('', [Validators.required]),
      siAnimaux: this.fb.control('', [Validators.required]),
      vehicules: this.fb.control('', [Validators.required]),
      noPlaques: this.fb.control('', [Validators.required]),
      siInstruments: this.fb.control('', [Validators.required]),
      instruments: this.fb.control('', [Validators.required]),
      siBailRésilié: this.fb.control('', [Validators.required]),
      résilièPar: this.fb.control('', [Validators.required]),
      motifDuDéménagement: this.fb.control('', [Validators.required]),
      tosAgreement: this.fb.control('', [Validators.required]),
    });
  }

  submitForm() {
    const formData = {
      immobilier: this.firstFormGroup.value,
      locateur: this.secondFormGroup.value,
      co_locataire: this.thirdFormGroup.value,
      plus_details: this.fourthFormGroup.value
    };


    const clientForm = this.firebaseDb.object('order');
    clientForm.set(formData);
  }

}
