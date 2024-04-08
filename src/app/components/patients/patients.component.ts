// patients.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from 'fhir/r5';

import { PatientComponent } from '../patient/patient.component';
import { ResourceService } from '../../services/ressource.service';
import { apiEndpoints } from '../../constants';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, PatientComponent],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.patient, // Update with your actual URL
    },
    ResourceService,
  ],
})
export class PatientsComponent implements OnInit {
  constructor(private service: ResourceService<Patient>) {}

  patientArr$: Patient[] = [];
  selectedPatient: Patient = {} as Patient;

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient() {
    this.service.getAll().subscribe((data: Patient[]) => {
      console.log(data);
      this.patientArr$ = data;
    });
  }

  selectPatient(selected: Patient) {
    console.log('clicked Patient' + selected.id);
    this.selectedPatient = selected;
  }

  onPatientModified(hidePatient: boolean) {
    console.log('Patient modified ' + hidePatient);
    if (hidePatient) {
      this.selectedPatient = {} as Patient;
    }
    this.getPatient();
  }

  createPatient() {
    const newPatient: Patient = {} as Patient;
    this.service.addOne(newPatient).subscribe((patient) => {
      console.log('Patient created');
      this.onPatientModified(true);
    });
  }
}
