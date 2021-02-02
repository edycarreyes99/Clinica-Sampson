import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {IConsultation} from '../../../interfaces/iconsultation';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from "@angular/fire/firestore";
import {CONSULTATIONS_DB_REF} from "../../../consts/DatabaseConsts";
import {GlobalService} from "../../../services/global.service";
import {ERROR_TOAST, SUCCESS_TOAST} from "../../../consts/ToastConsts";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-add-consultation-modal',
  templateUrl: './consultation-modal.component.html',
  styleUrls: ['./consultation-modal.component.scss']
})
export class ConsultationModalComponent implements OnInit {

  // Component's variables
  consultationForm: FormGroup;
  performingConsultation = false;

  constructor(
    public dialogRef: MatDialogRef<ConsultationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IConsultation,
    public dialog: MatDialog,
    private fs: AngularFirestore,
    private globalService: GlobalService
  ) {
    console.log('Consultation dialog data is:', this.dialogData);
    this.consultationForm = new FormGroup({
      ConsultationID: new FormControl(null, []),
      PatientID: new FormControl('', []),
      FechaConsulta: new FormControl(Timestamp.now().toDate(), [Validators.required]),
      S: new FormControl('', []),
      O: new FormControl('', []),
      A: new FormControl('', []),
      P: new FormControl('', []),
    });

    this.consultationForm.patchValue({
      ...this.dialogData,
      FechaConsulta: this.dialogData.FechaConsulta ? this.dialogData.FechaConsulta.toDate() : Timestamp.now().toDate()
    });
  }

  ngOnInit(): void {
  }

  async performConsultation(): Promise<boolean> {
    if (!this.consultationForm.valid) {
      return false;
    }

    if (this.performingConsultation) {
      return false;
    }

    this.performingConsultation = true;

    const newConsultationId = this.fs.createId();

    if (!this.consultationForm.get('ConsultationID').value) {
      this.consultationForm.get('ConsultationID').patchValue(newConsultationId);
    }

    return new Promise(async (resolve, rejects) => {
      await this.fs.collection(CONSULTATIONS_DB_REF).doc<IConsultation>(this.consultationForm.get('ConsultationID').value)
        [this.dialogData.ConsultationID ? 'update' : 'set'](this.consultationForm.value).then((consultationDoc) => {
        console.log('Consultation', this.dialogData.PatientID ? 'updated' : 'stored', 'correctly for this patient.');
        this.globalService.showToast(SUCCESS_TOAST, `Consulta ${this.dialogData.ConsultationID ? 'actualizada' : 'guardada'} correctamente`,
          `La consulta se ha ${this.dialogData.ConsultationID ? 'actualizado' : 'guardado'} correctamente en la base de datos.`);
        this.performingConsultation = false;
        this.dialogRef.close();
        resolve(true);
      }).catch((error) => {
        console.error('Error', this.dialogData.ConsultationID ? 'updating' : 'storing', 'consultation.');
        this.performingConsultation = false;
        this.globalService.showToast(ERROR_TOAST, `Error al ${this.dialogData.ConsultationID ? 'actualizar' : 'guardar'} la consulta para este paciente`, error.toString());
        rejects(false);
      });
    });
  }

}
