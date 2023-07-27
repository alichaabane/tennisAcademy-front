import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {PlanificationService} from "../../planification/all-planifications/planification.service";
import {TerrainService} from "../../terrain/all-terrain/terrain.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {formatDate} from "@angular/common";
import {Planification} from "../../planification/all-planifications/planification.model";
import {Seance} from "../all-seances/Seance.model";
import {SeanceService} from "../all-seances/seance.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

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
              private messageService: MessageService,
              private router: Router,
              private snackBar: MatSnackBar) { }

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
    this.seance.dateHeureDebut = this.seanceForm.value.dateDebut;
    this.seance.dateHeureDebut = formatDate(this.seance.dateHeureDebut, 'yyyy-MM-dd', "en-US");
    this.seance.dateHeureFin = this.seanceForm.value.dateFin;
    this.seance.dateHeureFin =  formatDate(this.seance.dateHeureFin, 'yyyy-MM-dd', "en-US");
    this.seance.terrain = this.seanceForm.value.terrain;
    this.seance.planification = this.seanceForm.value.planification;
    this.addSeance();
  }

  private addSeance() {

    this.seanceService.addSeance(this.seance).subscribe(
      data => {
        if (data) {
          this.router.navigate(['/seance/all-seances']);

        } else {
          this.messageService.add({
              severity: 'FAILED',
              summary: 'Error',
              detail: 'Désole impossible d ajouter une séance',
              life: 3000
          });
        }
      }, error => {
        this.messageService.add({
            severity: 'FAILED',
            summary: 'Désole impossible d ajouter une séance',
            detail: error.error,
            life: 3000
        });
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
