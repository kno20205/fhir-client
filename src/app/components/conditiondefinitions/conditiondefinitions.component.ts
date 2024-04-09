import { ConditiondefinitionComponent } from './../conditiondefinition/conditiondefinition.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { apiEndpoints } from '../../constants';
import { ResourceService } from '../../services/ressource.service';
import { ConditionDefinition } from 'fhir/r5';

@Component({
  selector: 'app-conditiondefinitions',
  standalone: true,
  imports: [CommonModule, ConditiondefinitionComponent],
  templateUrl: './conditiondefinitions.component.html',
  styleUrl: './conditiondefinitions.component.scss',
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.conditiondefinition,
    },
    ResourceService,
  ],
})
export class ConditiondefinitionsComponent implements OnInit {
  constructor(private service: ResourceService<ConditionDefinition>) {}

  conditionDefinitionsArr$: ConditionDefinition[] = [];
  selectedConditionDefinition: ConditionDefinition = {} as ConditionDefinition;

  ngOnInit(): void {
    this.getConditionDefinition();
  }

  getConditionDefinition() {
    this.service.getAll().subscribe((data: ConditionDefinition[]) => {
      console.log(data);
      this.conditionDefinitionsArr$ = data;
    });
  }

  selectConditionDefinition(selected: ConditionDefinition) {
    console.log('clicked ConditionDefinition' + selected.id);
    this.selectedConditionDefinition = selected;
  }

  onConditionDefinitionModified(updated: boolean) {
    console.log('ConditionDefinition modified ' + updated);
    if (updated) {
      this.selectedConditionDefinition = {} as ConditionDefinition;
    }
    this.getConditionDefinition();
  }

  createConditionDefinition() {
    const newConditionDefinition: ConditionDefinition =
      {} as ConditionDefinition;
    console.log(newConditionDefinition);
    this.service
      .addOne(newConditionDefinition)
      .subscribe((ConditionDefinition) => {
        this.onConditionDefinitionModified(true);
      });
  }
}
