import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {CONSULTATIONS_DB_REF, PATIENTS_DB_REF} from '../../consts/DatabaseConsts';
import {IPatient} from '../../interfaces/ipatient';
import {IConsultation} from '../../interfaces/iconsultation';
import {GlobalService} from '../../services/global.service';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../consts/ToastConsts';
import {MatDialog} from '@angular/material/dialog';
import {ConsultationModalComponent} from '../../components/modals/consultation-modal/consultation-modal.component';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-patient-consultations',
  templateUrl: './patient-consultations.component.html',
  styleUrls: ['./patient-consultations.component.scss']
})
export class PatientConsultationsComponent implements OnInit {

  // Components variables
  patientName = '';
  patientConsultations: IConsultation[] = [];
  patientID = '';
  removingConsultation = false;

  constructor(
    private route: ActivatedRoute,
    private fs: AngularFirestore,
    private globalService: GlobalService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(async (params) => {
      this.patientID = params.patientID;
      await this.fs.collection(PATIENTS_DB_REF).doc<IPatient>(params.patientID).snapshotChanges().subscribe(async (patient) => {
        const patientData: IPatient = patient.payload.data();

        this.patientName = patientData.Nombres + ' ' + patientData.Apellidos;

        await this.fs.collection<IConsultation>(CONSULTATIONS_DB_REF,
          (result) =>
            result.where('PatientID', '==', this.patientID).orderBy('FechaConsulta', 'desc'))
          .valueChanges().subscribe((consultations) => {
            this.patientConsultations = consultations;
          }, error => {
            console.error('Error getting consultations for this patient:', error);
            this.globalService.showToast(ERROR_TOAST, 'Error al obtener las consultas para este paciente', error.toString());
          });
      });
    });
  }

  ngOnInit(): void {
  }

  // Method to open a consultation modal
  openConsultationModal(consultation?: IConsultation): void {
    const consultationData: IConsultation = consultation ? consultation : new class implements IConsultation {
      A: string;
      ConsultationID: string;
      FechaConsulta: Timestamp;
      O: string;
      P: string;
      PatientID: string;
      S: string;
    }();

    this.dialog.open(ConsultationModalComponent, {
      width: '50rem',
      data: {...consultationData, PatientID: this.patientID}
    });
  }

  // Method to remove a consultation
  async removeConsultation(consultation: IConsultation): Promise<boolean> {
    if (this.removingConsultation) {
      return false;
    }

    if (confirm('¿Estás seguro que deseas eliminar esta consulta?')) {
      return new Promise(async (resolve, rejects) => {
        await this.fs.collection(CONSULTATIONS_DB_REF).doc<IConsultation>(consultation.ConsultationID).delete().then((consultationDoc) => {
          console.log('Consultation remove successfully');
          this.removingConsultation = false;
          this.globalService.showToast(SUCCESS_TOAST, 'Consulta removida correctamente',
            'La consulta de este paciente se ha removido de la base de datos correctamente');
          resolve(true);
        }).catch((error) => {
          console.error('Error removing consultation:', error);
          this.globalService.showToast(ERROR_TOAST, 'Error al eliminar la consulta', error.toString());
          this.removingConsultation = false;
          rejects(false);
        });
      });
    } else {
      return false;
    }
  }
}
