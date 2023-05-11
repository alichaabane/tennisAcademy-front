import { Utilisateur } from "../utilisateur/all-utilisateur/utilisateur.model";
import { Publication } from "../publication/publication.model";

export class Commentaire {
    idCommentaire:number;
    textCommentaire: string;
    localDateheureCommentaire: string;
    utilisateur: Utilisateur;
    publication:Publication;
    constructor() {
      {
        this.idCommentaire=0;
        this.textCommentaire = '';
        this.localDateheureCommentaire = '';
        this.utilisateur=new Utilisateur();
        this.publication=new Publication();

      }
    }

  }