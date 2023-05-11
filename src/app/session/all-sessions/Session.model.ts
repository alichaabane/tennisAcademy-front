import { Planification } from 'src/app/planification/all-planifications/planification.model';
import { Terrain } from '../../terrain/all-terrain/terrain.model';


export class Session {
    idSession: number;
    dateHeureDebut: string;
    dateHeureFin: string;
    terrain: Terrain;
    planification:Planification;
    constructor() {
      {
          this.idSession=0;
          this.dateHeureDebut = '';
          this.dateHeureFin = '';
          this.terrain = new Terrain();
          this.planification = new Planification();

        }
    }
  }