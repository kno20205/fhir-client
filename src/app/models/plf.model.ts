import { MedicinalProduct as correctMedicinalProduct } from 'fhir/r4';
export interface Text {
  id: string;
  status: string;
  div: string;
}

export interface Identifier {
  id: string;
  use: any;
  type: any;
  system: string;
  value: string;
  period: any;
  assigner: any;
}

export interface RessourceTr {
  id: string;
  description: string;
  supportedInteraction: string;
}
export interface Rule {
  type: string;
}

export interface Plf {
  id: string;
  text: Text;
  status: string;
  date: string[];
  combining: string;
  rule: Rule[];
}

export interface MedicinalProduct extends correctMedicinalProduct {
  version: string;
}
//
