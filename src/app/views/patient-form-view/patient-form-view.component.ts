import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';

@Component({
  selector: 'app-patient-form-view',
  templateUrl: './patient-form-view.component.html',
  styleUrls: ['./patient-form-view.component.scss']
})
export class PatientFormViewComponent implements OnInit {

  // Component's variables
  patientForm: FormGroup;
  formFieldAppearance: MatFormFieldAppearance = 'outline';
  tableFormFieldAppearance: MatFormFieldAppearance = 'legacy';

  constructor() {
    this.patientForm = new FormGroup({
      // 1- Datos generales
      NumeroExpediente: new FormControl('', [Validators.required]),
      Nombres: new FormControl('', [Validators.required]),
      Apellidos: new FormControl('', [Validators.required]),
      FechaIngreso: new FormControl(new Date(), [Validators.required]),
      Edad: new FormControl(null, [Validators.required]),
      Sexo: new FormControl('', [Validators.required]),
      Nacionalidad: new FormControl('', [Validators.required]),
      Departamento: new FormControl('', [Validators.required]),
      Municipio: new FormControl('', [Validators.required]),
      TelefonoCasa: new FormControl('', []),
      TelefonoOficina: new FormControl('', []),
      TelefonoCelular: new FormControl('', []),
      NumeroHijos: new FormControl('', []),
      Email: new FormControl('', [Validators.email]),
      Fax: new FormControl('', []),
      DireccionCasa: new FormControl('', []),
      DireccionTrabajo: new FormControl('', []),

      // 2- Motivo de la consulta
      MotivoConsulta: new FormControl('', []),

      // 3- Examen Clínico
      AgudezaVisualOjoDerecho: new FormControl(null, []),
      AgudezaVisualOjoIzquierdo: new FormControl(null, []),
      SinLentesOjoDerecho: new FormControl(null, []),
      SinLentesOjoIzquierdo: new FormControl(null, []),
      ConLentesOjoDerecho: new FormControl(null, []),
      ConLentesOjoIzquierdo: new FormControl(null, []),
      EstenopeicoOjoDerecho: new FormControl(null, []),
      EstenopeicoOjoIzquierdo: new FormControl(null, []),

      RefraccionOjoDerecho: new FormControl(null, []),
      RefraccionOjoIzquierdo: new FormControl(null, []),
      SKDinamicaOjoDerecho: new FormControl(null, []),
      SKDinamicaOjoIzquierdo: new FormControl(null, []),
      SKCiclopegicaOjoDerecho: new FormControl(null, []),
      SKCiclopegicaOjoIzquierdo: new FormControl(null, []),

      PrescripcionOjoDerecho: new FormControl(null, []),
      PrescripcionOjoIzquierdo: new FormControl(null, []),
      EsferaOjoDerecho: new FormControl(null, []),
      EsferaOjoIzquierdo: new FormControl(null, []),
      CilindroOjoDerecho: new FormControl(null, []),
      CilindroOjoIzquierdo: new FormControl(null, []),
      EjesOjoDerecho: new FormControl(null, []),
      EjesOjoIzquierdo: new FormControl(null, []),
      DPOjoDerecho: new FormControl(null, []),
      ADDOjoIzquierdo: new FormControl(null, []),

      // 4- Lámpara de hendidura
      LamparaDeEndidura: new FormControl('', []),

      // 5- Fondo de ojo
      FondoDeOjo: new FormControl('', []),

      // 6- Presión intra ocular
      PresionIntraOcular: new FormControl('', []),

      // 7- Movilidad ocular
      MotilidadOcular: new FormControl('', []),
    });
  }

  ngOnInit(): void {
  }

  // Method to get the form control value
  getFormControl(formControlName: string): AbstractControl | null {
    return this.patientForm.get(formControlName);
  }
}
