import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Condition } from 'fhir/r5';
import { apiEndpoints } from '../../constants';
import { ResourceService } from '../../services/ressource.service';
import { ConditionComponent } from '../condition/condition.component';

@Component({
  selector: 'app-conditions',
  standalone: true,
  templateUrl: './conditions.component.html',
  styleUrl: './conditions.component.scss',
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.condition,
    },
    ResourceService,
  ],
  imports: [CommonModule, ConditionComponent],
})
export class ConditionsComponent implements OnInit {
  conditions: Condition[] = [];

  constructor(private service: ResourceService<Condition>) {}
  conditionArr$: Condition[] = [];
  selectedCondition: Condition = {} as Condition;

  ngOnInit(): void {
    this.getCondition();
    console.log(apiEndpoints);
  }

  getCondition() {
    this.service.getAll().subscribe((data: Condition[]) => {
      console.log(data);
      this.conditionArr$ = data;
    });
  }

  selectCondition(selected: Condition) {
    console.log('clicked Condition' + selected.id);
    this.selectedCondition = selected;
  }

  onConditionModified(updated: boolean) {
    console.log('Condition modified ' + updated);
    if (updated) {
      this.selectedCondition = {} as Condition;
    }
    this.getCondition();
  }

  createCondition() {
    const newCondition: Condition = {} as Condition;
    console.log(newCondition);
    newCondition.subject = { reference: '' };
    newCondition.clinicalStatus = { coding: [{ code: 'unknown' }] };
    this.service.addOne(newCondition).subscribe((Condition) => {
      this.onConditionModified(true);
    });
  }
}
