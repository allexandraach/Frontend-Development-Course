import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { GetPatientsService } from '../../services/patients/get-patients.service';

@Component({
  selector: 'app-patient-component',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})

export class PatientComponent implements OnInit {

  patientsList: Patient[] = [];

  constructor(private GetPatientsService: GetPatientsService) {
  }

  ngOnInit() {
    this.patientsList = this.GetPatientsService.getPatientsList();
  }

  isNotShown: boolean = true;

  displayDetails(data: any) {
    data.showDetails = !data.showDetails;
  }

  newWeight: number = 0;

  getNewWeight() {
    return this.newWeight;
  }

}
