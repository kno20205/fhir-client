import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConditionDefinition } from 'fhir/r5';
import { apiEndpoints } from '../../constants';
import { ResourceService } from '../../services/ressource.service';

@Component({
  selector: 'app-conditiondefinition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conditiondefinition.component.html',
  styleUrl: './conditiondefinition.component.scss',
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.conditiondefinition,
    },
    ResourceService,
  ],
})
export class ConditiondefinitionComponent {
  constructor(private service: ResourceService<ConditionDefinition>) {}
  @Input() id: string = '';
  @Output() conditionDefinitionModified = new EventEmitter<boolean>();
  conditionDefinition: ConditionDefinition = {} as ConditionDefinition;

  ngOnInit(): void {
    this.getConditionDefinition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.getConditionDefinition();
    }
  }

  getConditionDefinition() {
    this.service.get(this.id).subscribe((data: ConditionDefinition) => {
      console.log(data);
      this.conditionDefinition = data;
    });
  }
  deleteConditionDefinition() {
    this.service
      .delete(this.conditionDefinition.id!)
      .subscribe((x) => this.conditionDefinitionModified.emit(true));
  }

  updateConditionDefinition() {
    const newConditionDefinition: ConditionDefinition =
      this.conditionDefinition;
    this.service
      .update(newConditionDefinition)
      .subscribe((conditionDefinition) => {
        console.log('ConditionDefinition updated');
        this.conditionDefinition = conditionDefinition;
        this.conditionDefinitionModified.emit(true);
      });
  }
}
