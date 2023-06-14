import { Utilisateur } from "../utilisateur/all-utilisateur/utilisateur.model";
import { Commentaire } from "../publication/commentaire.model";

export class Publication {
    idPublication:number;
    text: string;
    localDateheurePublication: string;
    utilisateur: Utilisateur;
    commentaires: Commentaire[];
    // constructor() {
    //   {
    //     this.idPublication=0;
    //     this.text = '';
    //     this.localDateheurePublication = '';
    //     this.utilisateur=new Utilisateur();
    //     this.commentaires=[];
    //   }
    // }

  }
