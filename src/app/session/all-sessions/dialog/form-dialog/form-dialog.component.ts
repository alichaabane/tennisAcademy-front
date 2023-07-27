import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Planification } from 'src/app/planification/all-planifications/planification.model';
import { Terrain } from 'src/app/terrain/all-terrain/terrain.model';
import { Session } from '../../Session.model';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  public planificationsList: Planification[]=[];
  public terrainsList: Terrain[]=[];
  public oldPlanification:Planification;

  action: string;
  dialogTitle: string;
  sessionForm: FormGroup;
  session: Session;
  constructor(  private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sessionService: SessionService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'editer') {
      this.dialogTitle = data.session.idSession;
      this.session = data.session;
      this.oldPlanification=this.session.planification;
      console.log(this.session);

    } else {
      this.dialogTitle = 'New Session';
      this.session = new Session();
      this.oldPlanification=new Planification();
    }
    this.sessionForm = this.createContactForm();
    this.getAllPlanification();
    this.getAllTerrains();

  }

  getAllPlanification(){
    this.sessionService.getAllPlanification().subscribe(
      (data) => {
        this.planificationsList=data;
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
    this.sessionService.getAllTerrain().subscribe(
      (data) => {
        this.terrainsList=data;
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

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      dateHeureDebut: [this.session.dateHeureDebut, [Validators.required]],
      dateHeureFin: [this.session.dateHeureFin,[Validators.required]],
      terrain: [this.session.terrain.idTerrain,[Validators.required]],
      planification: [this.session.planification.idPlanification,[Validators.required]],
    });
  }


  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
}

  
  public confirmAdd(): void {
    console.log(this.sessionForm.getRawValue());
    if (this.sessionForm.valid){
      this.session.dateHeureDebut=this.sessionForm.value.dateDebut;
      //this.session.dateHeureFin=formatDate(this.session.,'yyyy-MM-dd',"en-US");
      this.session.dateHeureFin=this.sessionForm.value.dateHeureFin;
      this.session.planification=this.sessionForm.value.planification;
      this.session.terrain=this.sessionForm.value.terrain;
  
    //   this.planificationForm.value.jourSemaine.forEach(element => {
    //     this.planification.jourSemaine=this.planification.jourSemaine+element
    // });
    // this.planification.cours=this.planificationForm.value.cours;
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
