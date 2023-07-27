import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.sass']
})
export class AddSeanceComponent implements OnInit {
  seanceForm: FormGroup;
  terrainList: any;
  seancePlanifieeList: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
