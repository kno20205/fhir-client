import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { apiEndpoints } from '../../constants';
import { ResourceService } from '../../services/ressource.service';
import { MedicinalProduct } from '../../models/plf.model';

@Component({
  selector: 'app-medicinalproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medicinalproduct.component.html',
  styleUrl: './medicinalproduct.component.scss',
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.medicinalproduct,
    },
    ResourceService,
  ],
})
export class MedicinalproductComponent {
  constructor(private service: ResourceService<MedicinalProduct>) {}
  @Input() id: string = '';
  @Output() medicinalProductModified = new EventEmitter<boolean>();

  medicinalProduct: MedicinalProduct = {} as MedicinalProduct;

  ngOnInit(): void {
    this.getMedicinalProduct();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.getMedicinalProduct();
    }
  }

  getMedicinalProduct() {
    this.service.get(this.id).subscribe((data: MedicinalProduct) => {
      console.log(data);
      this.medicinalProduct = data;
    });
  }
  deleteMedicinalProduct() {
    this.service
      .delete(this.medicinalProduct.id!)
      .subscribe((x) => this.medicinalProductModified.emit(true));
  }
  updateMedicinalProduct() {
    const newMedicinalProduct: MedicinalProduct = this.medicinalProduct;
    this.service.update(newMedicinalProduct).subscribe((medicinalProduct) => {
      console.log('MedicinalProduct updated');
      this.medicinalProduct = medicinalProduct;
      this.medicinalProductModified.emit(false);
    });
  }
  addName() {
    this.medicinalProduct.name.push({ productName: '' });
  }
  deleteName(index: number) {
    this.medicinalProduct.name.splice(index, 1);
  }
}
