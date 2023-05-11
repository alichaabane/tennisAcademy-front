import { Utilisateur } from "./utilisateur.model";

export class Joueur extends Utilisateur{
    nbrMatchJoues: number;
    gender: string;
    constructor() {
    super();
      {
          this.nbrMatchJoues=0;
          this.gender = '';
        }
    }
  }
  