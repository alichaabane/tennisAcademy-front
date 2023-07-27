import { Planification } from 'src/app/planification/all-planifications/planification.model';
import { Terrain } from '../../terrain/all-terrain/terrain.model';


export class Seance {
  idSeance: number;
    dateHeureDebut: string;
    dateHeureFin: string;
    terrain: Terrain;
    planification: Planification;
    constructor() {
      {
          this.idSeance = 0;
          this.dateHeureDebut = '';
          this.dateHeureFin = '';
          this.terrain = new Terrain();
          this.planification = new Planification();

        }
    }
  }
