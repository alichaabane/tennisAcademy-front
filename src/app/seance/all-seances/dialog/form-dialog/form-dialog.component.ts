import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Planification } from 'src/app/planification/all-planifications/planification.model';
import { Terrain } from 'src/app/terrain/all-terrain/terrain.model';
import { Seance } from '../../Seance.model';
import { SeanceService } from '../../seance.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  constructor(  private snackBar: MatSnackBar,
                public dialogRef: MatDialogRef<FormDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public seanceService: SeanceService,
                private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'editer') {
      this.dialogTitle = data.seance.idSeance;
      this.seance = data.seance;
      this.oldPlanification = this.seance.planification;
      console.log(this.seance);

    } else {
      this.dialogTitle = 'New Seance';
      this.seance = new Seance();
      this.oldPlanification = new Planification();
    }
    this.seanceForm = this.createContactForm();
    this.getAllPlanification();
    this.getAllTerrains();

  }
  public planificationsList: Planification[] = [];
  public terrainsList: Terrain[] = [];
  public oldPlanification: Planification;

  action: string;
  dialogTitle: string;
  seanceForm: FormGroup;
  seance: Seance;

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getAllPlanification(){
    this.seanceService.getAllPlanification().subscribe(
      (data) => {
        this.planificationsList = data;
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

  getAllTerrains(){
    this.seanceService.getAllTerrain().subscribe(
      (data) => {
        this.terrainsList = data;
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
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      dateHeureDebut: [this.seance.dateHeureDebut, [Validators.required]],
      dateHeureFin: [this.seance.dateHeureFin, [Validators.required]],
      terrain: [this.seance.terrain.idTerrain, [Validators.required]],
      planification: [this.seance.planification.idPlanification, [Validators.required]],
    });
  }


  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
}


  public confirmAdd(): void {
    console.log(this.seanceForm.getRawValue());
    if (this.seanceForm.valid){
      this.seance.dateHeureDebut = this.seanceForm.value.dateDebut;
      // this.seance.dateHeureFin=formatDate(this.seance.,'yyyy-MM-dd',"en-US");
      this.seance.dateHeureFin = this.seanceForm.value.dateHeureFin;
      this.seance.planification = this.seanceForm.value.planification;
      this.seance.terrain = this.seanceForm.value.terrain;

    //   this.seanceForm.value.jourSemaine.forEach(element => {
    //     this.planification.jourSemaine=this.planification.jourSemaine+element
    // });
    // this.planification.cours=this.seanceForm.value.cours;
    }

  }
  openedChange(opened: boolean) {
    console.log(opened ? 'opened' : 'closed');
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
