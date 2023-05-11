import { Cours } from "../../cours/all-cours/cours.model";
import { Utilisateur } from "../../utilisateur/all-utilisateur/utilisateur.model";

export class Planification {
    idPlanification:number;
    dateDebut: string;
    dateFin: string;
    jourSemaine: string;
    cours: Cours;
    joueursInscrits: Utilisateur[];

    constructor() {
      {
        this.idPlanification=0;
        this.dateDebut = '';
        this.dateFin = '';
        this.jourSemaine ='';
        this.cours=new Cours();
        this.joueursInscrits = [];
      }
    }

  }