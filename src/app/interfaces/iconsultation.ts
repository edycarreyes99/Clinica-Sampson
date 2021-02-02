import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface IConsultation {
  ConsultationID?: string;
  PatientID?: string;
  FechaConsulta?: Timestamp;
  S?: string;
  O?: string;
  A?: string;
  P?: string;
}
