import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Patient } from 'fhir/r5';
import { ResourceService } from '../../services/ressource.service';
import { apiEndpoints } from '../../constants';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./patient.component.scss'],
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.patient,
    },
    ResourceService,
  ],
})
export class PatientComponent {
  constructor(private service: ResourceService<Patient>) {}
  @Input() id: string = '';
  @Output() patientModified = new EventEmitter<boolean>();
  patient: Patient = {} as Patient;
  genderOptions: string[] = ['male', 'female', 'other', 'unknown'];
  ngOnInit(): void {
    this.getPatient();
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.getPatient();
  }

  getPatient() {
    this.service.get(this.id).subscribe((data: Patient) => {
      console.log(data);
      this.patient = data;
    });
  }

  deletePatient() {
    this.service
      .delete(this.patient.id!)
      .subscribe((x) => this.patientModified.emit(true));
  }
  updatePatient() {
    let newPatient: Patient = this.patient;
    this.service.update(newPatient).subscribe((patient) => {
      console.log('Patient updated');
      this.patient = patient;
      this.patientModified.emit(false);
    });
  }
}
