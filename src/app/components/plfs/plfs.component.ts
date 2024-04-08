import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/ressource.service';
import { Plf } from '../../models/plf.model';
import { CommonModule } from '@angular/common';
import { PlfComponent } from '../plf/plf.component';
import { apiEndpoints } from '../../constants';

@Component({
  selector: 'app-plfs',
  standalone: true,
  templateUrl: './plfs.component.html',
  styleUrl: './plfs.component.scss',
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.plf,
    },
    ResourceService,
  ],
  imports: [CommonModule, PlfComponent],
})
export class PlfsComponent implements OnInit {
  constructor(private service: ResourceService<Plf>) {}

  plfArr$: Plf[] = [];
  selectedPlf: Plf = {} as Plf;

  ngOnInit(): void {
    this.getPlf();
  }

  getPlf() {
    this.service.getAll().subscribe((data: Plf[]) => {
      console.log(data);
      this.plfArr$ = data;
    });
  }

  selectPlf(selected: Plf) {
    console.log('clicked Plf' + selected.id);
    this.selectedPlf = selected;
  }

  onPlfModified(updated: boolean) {
    console.log('Plf modified ' + updated);
    if (updated) {
      this.selectedPlf = {} as Plf;
    }
    this.getPlf();
  }

  createPlf() {
    const newPlf: Plf = {} as Plf;
    newPlf.status = 'active';
    newPlf.combining = 'deny-overrides';
    console.log(newPlf);
    this.service.addOne(newPlf).subscribe((Plf) => {
      this.onPlfModified(true);
    });
  }
}
