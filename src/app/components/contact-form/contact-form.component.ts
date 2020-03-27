import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  constructor(private fb: FormBuilder) { }

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
    this.thirdFormGroup = this.fb.group({});
    this.fourthFormGroup = this.fb.group({});
  }

}
