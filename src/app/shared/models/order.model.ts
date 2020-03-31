import { Immobilier } from './immobilier.model';
import { CoTitulaire } from './co-titulaire.model';
import { Locataire } from './locataire.model';
import { OtherDetails } from './other-details.model';

export class Order {
immobilier: Immobilier;
locataire: Locataire;
coTitulaire: CoTitulaire ;
plusDetails: OtherDetails;

}
