import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Practitioner } from 'fhir/r5';
import { ResourceService } from '../../services/ressource.service';
import { apiEndpoints } from '../../constants';
import { SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrl: './practitioner.component.scss',
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.practitioner,
    },
    ResourceService,
  ],
})
export class PractitionerComponent {
  constructor(private service: ResourceService<Practitioner>) {}

  @Input() id: string = '';
  @Output() practitionerModified = new EventEmitter<boolean>();
  practitioner: Practitioner = {} as Practitioner;

  ngOnInit(): void {
    this.getPractitioner();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.getPractitioner();
    }
  }

  getPractitioner() {
    this.service.get(this.id).subscribe((data: Practitioner) => {
      console.log(data);
      this.practitioner = data;
    });
  }

  deletePractitioner() {
    this.service
      .delete(this.practitioner.id!)
      .subscribe((x) => this.practitionerModified.emit(true));
  }

  updatePractitioner() {
    const newPractitioner: Practitioner = this.practitioner;
    this.service.update(newPractitioner).subscribe((practitioner) => {
      console.log('Practitioner updated');
      this.practitioner = practitioner;
      this.practitionerModified.emit(false);
    });
  }
}
