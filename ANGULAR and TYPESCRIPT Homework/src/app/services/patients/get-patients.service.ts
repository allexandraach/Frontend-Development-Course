import { Injectable } from '@angular/core';
import { Patient } from '../../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class GetPatientsService {

  public PatientsList: Patient[] = [
    {
      id: 1,
      name: "John Doe",
      height: 1.84,
      weight: 84,
      showDetails: false
  
    },
    {
      id: 2,
      name: "Jane Crimson",
      height: 1.70,
      weight: 104,
      showDetails: false
    },
    {
      id: 3,
      name: "Ryan Derby",
      height: 1.75,
      weight: 67,
      showDetails: false
    },
    {
      id: 4,
      name: "Dakota Henrison",
      height: 1.62,
      weight: 52,
      showDetails: false
    },
    {
      id: 5,
      name: "Cody Lovato",
      height: 1.87,
      weight: 97,
      showDetails: false
    },
    {
      id: 6,
      name: "Zoe Fox",
      height: 1.60,
      weight: 75,
      showDetails: false
    },
    {
      id: 7,
      name: "Rose Carrey",
      height: 1.67,
      weight: 47,
      showDetails: false
    },
    {
      id: 8,
      name: "Alice Anderson",
      height: 1.74,
      weight: 120,
      showDetails: false
    },
    {
      id: 9,
      name: "Louis Biden",
      height: 1.92,
      weight: 130,
      showDetails: false
    },
    {
      id: 10,
      name: "Andrew Jolie",
      height: 1.64,
      weight: 76,
      showDetails: false
    }
  ];

  public getPatientsList(): Patient[] {
    return this.PatientsList;
  }

}