import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Annotation, Condition, Period } from 'fhir/r5';
import { ResourceService } from '../../services/ressource.service';
import { apiEndpoints } from '../../constants';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./condition.component.scss'],
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.condition,
    },
    ResourceService,
    DatePipe,
  ],
})
export class ConditionComponent {
  @Input() id: string = '';
  @Output() conditionModified = new EventEmitter<boolean>();
  condition: Condition = {} as Condition;
  period: Period = {} as Period;
  notes: Annotation[] = [];
  showJson = false;
  jsonString: string = '';

  clinicalStatusOptions = [
    { value: 'active', display: 'Active' },
    { value: 'recurrence', display: 'Recurrence' },
    { value: 'relapse', display: 'Relapse' },
    { value: 'inactive', display: 'Inactive' },
    { value: 'remission', display: 'Remission' },
    { value: 'resolved', display: 'Resolved' },
    { value: 'unknown', display: 'Unknown' },
  ];

  constructor(private service: ResourceService<Condition>) {}

  ngOnInit(): void {
    this.getCondition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.getCondition();
    }
  }

  getCondition(): void {
    if (this.id) {
      this.service.get(this.id).subscribe((data: Condition) => {
        this.condition = data;
        this.period = this.condition.onsetPeriod || ({} as Period);
        this.notes = this.condition.note || [];
      });
    }
  }

  deleteCondition(): void {
    if (this.condition.id) {
      this.service.delete(this.condition.id).subscribe(() => {
        this.conditionModified.emit(true);
      });
    }
  }

  updateCondition(): void {
    // Check if the JSON view is enabled and the jsonString is available
    if (this.showJson && this.jsonString) {
      try {
        // Attempt to parse the jsonString into the condition object
        this.condition = JSON.parse(this.jsonString);
      } catch (e) {
        // If parsing fails, alert the user and exit the function
        alert('Invalid JSON');
        return;
      }
    } else {
      // If not in JSON view, ensure the condition object is updated from form inputs
      // Update any other necessary properties from the form here
      this.condition.onsetPeriod = this.period;
      this.condition.note = this.notes;
    }

    // Validate the onset period dates
    if (
      this.period.start &&
      this.period.end &&
      new Date(this.period.start) > new Date(this.period.end)
    ) {
      alert('The onset period start date must be before the end date.');
      return;
    }

    // Perform the update operation
    this.service.update(this.condition).subscribe(
      (condition) => {
        console.log('Condition updated', condition);
        this.condition = condition;
        // Emit an event or perform any actions needed after successful update
        this.conditionModified.emit(true);
      },
      (error) => {
        // Handle any errors from the update operation here
        console.error('Error updating condition:', error);
        alert('Failed to update condition.');
      }
    );
  }

  addNote(): void {
    const newNote: Annotation = {
      text: '', // Initialize with default values as necessary
      time: new Date().toISOString(), // Example timestamp, adjust as needed
    };
    this.notes.push(newNote);
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
  }

  toggleView() {
    this.showJson = !this.showJson;
    if (this.showJson) {
      this.jsonString = JSON.stringify(this.condition, null, 2);
    }
  }
}
