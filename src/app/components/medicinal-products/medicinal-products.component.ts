import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MedicinalproductComponent } from '../medicinalproduct/medicinalproduct.component';
import { apiEndpoints } from '../../constants';
import { ResourceService } from '../../services/ressource.service';
import { MedicinalProduct } from '../../models/plf.model';

@Component({
  selector: 'app-medicinal-products',
  standalone: true,
  imports: [CommonModule, MedicinalproductComponent],
  templateUrl: './medicinal-products.component.html',
  styleUrl: './medicinal-products.component.scss',
  providers: [
    {
      provide: 'resourceUrl',
      useValue: apiEndpoints.medicinalproduct,
    },
    ResourceService,
  ],
})
export class MedicinalProductsComponent implements OnInit {
  constructor(private service: ResourceService<MedicinalProduct>) {}

  medicinalProductsArr$: MedicinalProduct[] = [];
  selectedMedicinalProduct: MedicinalProduct = {} as MedicinalProduct;

  ngOnInit(): void {
    this.getMedicinalProduct();
  }

  getMedicinalProduct() {
    this.service.getAll().subscribe((data: MedicinalProduct[]) => {
      console.log(data);
      this.medicinalProductsArr$ = data;
    });
  }

  selectMedicinalProduct(selected: MedicinalProduct) {
    console.log('clicked MedicinalProduct' + selected.id);
    this.selectedMedicinalProduct = selected;
  }

  onMedicinalProductModified(updated: boolean) {
    console.log('MedicinalProduct modified ' + updated);
    if (updated) {
      this.selectedMedicinalProduct = {} as MedicinalProduct;
    }
    this.getMedicinalProduct();
  }

  createMedicinalProduct() {
    const newMedicinalProduct: MedicinalProduct = {} as MedicinalProduct;
    console.log(newMedicinalProduct);
    this.service.addOne(newMedicinalProduct).subscribe((MedicinalProduct) => {
      this.onMedicinalProductModified(true);
    });
  }
}
