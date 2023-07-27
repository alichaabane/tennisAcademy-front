import {Cours} from "../../cours/all-cours/cours.model";
import {User} from "../../user/all-user/user.model";

export class Planification {
  idPlanification: number;
  dateDebut: string;
  dateFin: string;
  jourSemaine: string;
  cours: Cours;
  joueursInscrits: User[];

  constructor() {
    {
      this.idPlanification = 0;
      this.dateDebut = '';
      this.dateFin = '';
      this.jourSemaine = '';
      this.cours = new Cours();
      this.joueursInscrits = [];
    }
  }

}
