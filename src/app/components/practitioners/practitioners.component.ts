import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Practitioner } from 'fhir/r5';
import { ResourceService } from '../../services/ressource.service';
import { PractitionerComponent } from '../practitioner/practitioner.component';
import { apiEndpoints } from '../../constants';

@Component({
  selector: 'app-practitioners',
  standalone: true,
  templateUrl: './practitioners.component.html',
  styleUrls: ['./practitioners.component.scss'],
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.practitioner,
    },
    ResourceService,
  ],
  imports: [CommonModule, PractitionerComponent],
})
export class PractitionersComponent implements OnInit {
  constructor(private service: ResourceService<Practitioner>) {}

  practitionerArr$: Practitioner[] = [];
  selectedPractitioner: Practitioner = {} as Practitioner;

  ngOnInit(): void {
    this.getPractitioner();
  }

  getPractitioner() {
    this.service.getAll().subscribe((data: Practitioner[]) => {
      console.log(data);
      this.practitionerArr$ = data;
    });
  }

  selectPractitioner(selected: Practitioner) {
    console.log('clicked Practitioner' + selected.id);
    this.selectedPractitioner = selected;
  }

  onPractitionerModified(updated: boolean) {
    console.log('Practitioner modified ' + updated);
    if (updated) {
      this.selectedPractitioner = {} as Practitioner;
    }
    this.getPractitioner();
  }

  createPractitioner() {
    var newPractitioner: Practitioner = {} as Practitioner;
    this.service.add(newPractitioner).subscribe(() => {
      console.log('Practitioner created');
      this.onPractitionerModified(true);
    });
  }
}
