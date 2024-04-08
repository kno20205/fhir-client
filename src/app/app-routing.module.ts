import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { PractitionersComponent } from './components/practitioners/practitioners.component';
import { PractitionerComponent } from './components/practitioner/practitioner.component';
import { PlfsComponent } from './components/plfs/plfs.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { MedicinalProductsComponent } from './components/medicinal-products/medicinal-products.component';

const routes: Routes = [
  { path: '', title: 'Patienten', component: PatientsComponent },
  { path: 'patients', title: 'Patienten', component: PatientsComponent },
  {
    path: 'practitioner',
    title: 'Practitioner',
    component: PractitionerComponent,
  },
  {
    path: 'practitioners',
    title: 'Practitioners',
    component: PractitionersComponent,
  },
  {
    path: 'plf',
    title: 'Plf',
    component: PlfsComponent,
  },
  { path: 'conditions', title: 'Conditions', component: ConditionsComponent },
  {
    path: 'medicinalproduct',
    title: 'MedicinalProduct',
    component: MedicinalProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export { routes };
//penis im popo