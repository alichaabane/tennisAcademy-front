import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {PlanificationService} from "../../planification/all-planifications/planification.service";
import {TerrainService} from "../../terrain/all-terrain/terrain.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe, formatDate} from "@angular/common";
import {Seance} from "../all-seances/Seance.model";
import {SeanceService} from "../all-seances/seance.service";
import {Router} from "@angular/router";
import {Planification} from "../../planification/all-planifications/planification.model";

@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.sass']
})
export class AddSeanceComponent implements OnInit {
  seanceForm: FormGroup;
  private seance = new Seance();
  terrainList: any;
  seancePlanifieeList: any;

  constructor(private planificationService: PlanificationService,
              private seanceService: SeanceService,
              private terrainService: TerrainService,
              private datePipe: DatePipe,
              private router: Router,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {

    this.seanceForm = this.fb.group({
      dateHeureDebut: ["", [Validators.required]],
      dateHeureFin: ["", [Validators.required]],
      terrain: [null, [Validators.required]],
      planification: [null, [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.getAllTerrains();
    this.getAllSeancePlanifiee();
  }


  getAllTerrains(){
    this.terrainService.getAllActiveTerrains().subscribe(
      (data) => {
        this.terrainList = data;
        console.log('terrainList = ', this.terrainList);

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        this.showNotification(
          'snackbar-danger',
          error.message,
          'bottom',
          'center'
        );
      }
    );
  }

  getAllSeancePlanifiee(){
    this.planificationService.getAllPlans().subscribe(
      (data) => {
        this.seancePlanifieeList = data;
        console.log('planifications = ', this.seancePlanifieeList);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        this.showNotification(
          'snackbar-danger',
          error.message,
          'bottom',
          'center'
        );
      }
    );
  }

  onSubmit() {
    if (this.seanceForm.invalid) {
      return;
    }
    this.seance.dateHeureDebut = this.seanceForm.value.dateHeureDebut;
    this.seance.dateHeureDebut = this.datePipe.transform(this.seance.dateHeureDebut, 'yyyy-MM-ddTHH:mm:ss');
    this.seance.dateHeureFin = this.seanceForm.value.dateHeureFin;
    this.seance.dateHeureFin =  this.datePipe.transform(this.seance.dateHeureFin, 'yyyy-MM-ddTHH:mm:ss');
    this.seance.terrain = this.seanceForm.value.terrain;
    this.seance.planification = this.seanceForm.value.planification;
    console.log('seance = ', this.seance.terrain);
    this.addSeance();
  }

  private addSeance() {

    this.seanceService.addSeance(this.seance).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/seance/all-seances']);

        } else {
          // this.messageService.add({
          //     severity: 'FAILED',
          //     summary: 'Error',
          //     detail: 'Désole impossible d ajouter une séance',
          //     life: 3000
          // });
        }
      }, error => {
        // this.messageService.add({
        //     severity: 'FAILED',
        //     summary: 'Désole impossible d ajouter une séance',
        //     detail: error.error,
        //     life: 3000
        // });
      }
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
