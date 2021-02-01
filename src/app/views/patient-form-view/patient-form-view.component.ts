import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {PATIENTS_DB_REF} from '../../consts/DatabaseConsts';
import {IPatient} from '../../interfaces/ipatient';
import {GlobalService} from "../../services/global.service";
import {ERROR_TOAST, SUCCESS_TOAST} from "../../consts/ToastConsts";

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
  patientID: string;
  savingPatient = false;

  constructor(
    private route: ActivatedRoute,
    private fs: AngularFirestore,
    private globalService: GlobalService
  ) {
    this.patchPatientForm();
    this.route.params.subscribe(async (params) => {
      console.log('Patient params are:', params);
      if (params.patientID) {
        this.patientID = params.patientID;

        await this.fs.collection(PATIENTS_DB_REF).doc<IPatient>(this.patientID).snapshotChanges().subscribe((patient) => {
          this.patchPatientForm(patient.payload.data());
        });
      } else {
        this.patchPatientForm();
      }
    });
  }

  ngOnInit(): void {
  }

  // Method to get the form control value
  getFormControl(formControlName: string): AbstractControl | null {
    return this.patientForm.get(formControlName);
  }

  // Method to save a patient
  async savePatient(): Promise<boolean> {
    if (this.savingPatient) {
      return false;
    }

    if (!this.patientForm.valid) {
      return false;
    }

    return new Promise(async (resolve, rejects) => {
      await this.fs.collection(PATIENTS_DB_REF).doc(this.patientForm.get('PatientID').value).set(
        this.patientForm.value
      ).then((patientStored) => {
        console.log('Patient', this.patientForm.get('Nombres'), this.patientForm.get('Apellidos'), 'saved to database correctly !');
        this.globalService.showToast(SUCCESS_TOAST, 'Paciente guardado correctamente',
          `El paciente ${this.patientForm.get('Nombres')} ${this.patientForm.get('Apellidos')} se ha guardado correctamente a la base de datos.`);
        this.savingPatient = false;
        resolve(true);
      }).catch((error) => {
        console.error('Error storing patient to database:', error);
        this.globalService.showToast(ERROR_TOAST, 'Error al guardar paciente', error.toString());
        this.savingPatient = false;
        rejects(false);
      });
    });
  }

  // Method to patch the values in the patient form
  patchPatientForm(patient?: IPatient): void {
    this.patientForm = new FormGroup({
      PatientID: new FormControl(this.patientID ? this.patientID : this.fs.createId(), [Validators.required]),

      // 1- Datos generales
      NumeroExpediente: new FormControl(patient ? patient.NumeroExpediente : '', [Validators.required]),
      Nombres: new FormControl(patient ? patient.Nombres : '', [Validators.required]),
      Apellidos: new FormControl(patient ? patient.Apellidos : '', [Validators.required]),
      Edad: new FormControl(patient ? patient.Edad : null, [Validators.required]),
      Telefono: new FormControl(patient ? patient.Telefono : '', []),
      Email: new FormControl(patient ? patient.Email : '', [Validators.email]),
      DireccionCasa: new FormControl(patient ? patient.DireccionCasa : '', []),

      // 2- Motivo de la consulta
      MotivoConsulta: new FormControl(patient ? patient.MotivoConsulta : '', []),

      // 3- Examen Clínico
      AgudezaVisualOjoDerecho: new FormControl(patient ? patient.AgudezaVisualOjoDerecho : null, []),
      AgudezaVisualOjoIzquierdo: new FormControl(patient ? patient.AgudezaVisualOjoIzquierdo : null, []),
      SinLentesOjoDerecho: new FormControl(patient ? patient.SinLentesOjoDerecho : null, []),
      SinLentesOjoIzquierdo: new FormControl(patient ? patient.SinLentesOjoIzquierdo : null, []),
      ConLentesOjoDerecho: new FormControl(patient ? patient.ConLentesOjoDerecho : null, []),
      ConLentesOjoIzquierdo: new FormControl(patient ? patient.ConLentesOjoIzquierdo : null, []),
      EstenopeicoOjoDerecho: new FormControl(patient ? patient.EstenopeicoOjoDerecho : null, []),
      EstenopeicoOjoIzquierdo: new FormControl(patient ? patient.EstenopeicoOjoIzquierdo : null, []),

      RefraccionOjoDerecho: new FormControl(patient ? patient.RefraccionOjoDerecho : null, []),
      RefraccionOjoIzquierdo: new FormControl(patient ? patient.RefraccionOjoIzquierdo : null, []),
      SKDinamicaOjoDerecho: new FormControl(patient ? patient.SKDinamicaOjoDerecho : null, []),
      SKDinamicaOjoIzquierdo: new FormControl(patient ? patient.SKDinamicaOjoIzquierdo : null, []),
      SKCiclopegicaOjoDerecho: new FormControl(patient ? patient.SKCiclopegicaOjoDerecho : null, []),
      SKCiclopegicaOjoIzquierdo: new FormControl(patient ? patient.SKCiclopegicaOjoIzquierdo : null, []),

      PrescripcionOjoDerecho: new FormControl(patient ? patient.PrescripcionOjoDerecho : null, []),
      PrescripcionOjoIzquierdo: new FormControl(patient ? patient.PrescripcionOjoIzquierdo : null, []),
      EsferaOjoDerecho: new FormControl(patient ? patient.EsferaOjoDerecho : null, []),
      EsferaOjoIzquierdo: new FormControl(patient ? patient.EsferaOjoIzquierdo : null, []),
      CilindroOjoDerecho: new FormControl(patient ? patient.CilindroOjoDerecho : null, []),
      CilindroOjoIzquierdo: new FormControl(patient ? patient.CilindroOjoIzquierdo : null, []),
      EjesOjoDerecho: new FormControl(patient ? patient.EjesOjoDerecho : null, []),
      EjesOjoIzquierdo: new FormControl(patient ? patient.EjesOjoIzquierdo : null, []),
      DPOjoDerecho: new FormControl(patient ? patient.DPOjoDerecho : null, []),
      ADDOjoIzquierdo: new FormControl(patient ? patient.ADDOjoIzquierdo : null, []),

      // 4- Lámpara de hendidura
      LamparaDeEndidura: new FormControl(patient ? patient.LamparaDeEndidura : '', []),

      // 5- Fondo de ojo
      FondoDeOjo: new FormControl(patient ? patient.FondoDeOjo : '', []),

      // 6- Presión intra ocular
      PresionIntraOcular: new FormControl(patient ? patient.PresionIntraOcular : '', []),

      // 7- Movilidad ocular
      MotilidadOcular: new FormControl(patient ? patient.MotilidadOcular : '', []),
    });
  }
}
