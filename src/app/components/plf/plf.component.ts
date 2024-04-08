import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourceService } from '../../services/ressource.service';
import { apiEndpoints } from '../../constants';
import { Plf } from '../../models/plf.model';
import { SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-plf',
  templateUrl: './plf.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrl: './plf.component.scss',
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.plf,
    },
    ResourceService,
  ],
})
export class PlfComponent {
  constructor(private service: ResourceService<Plf>) {}

  @Input() id: string = '';
  @Output() plfModified = new EventEmitter<boolean>();
  plf: Plf = {} as Plf;

  ngOnInit(): void {
    this.getPlf();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.getPlf();
    }
  }

  getPlf() {
    this.service.get(this.id).subscribe((data: Plf) => {
      console.log(data);
      this.plf = data;
    });
  }
  deletePlf() {
    this.service
      .delete(this.plf.id!)
      .subscribe((x) => this.plfModified.emit(true));
  }
  updatePlf() {
    const newPlf: Plf = this.plf;
    this.service.update(newPlf).subscribe((plf) => {
      console.log('Plf updated');
      this.plf = plf;
      this.plfModified.emit(false);
    });
  }
}
