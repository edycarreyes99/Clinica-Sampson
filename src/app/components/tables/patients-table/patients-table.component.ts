import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';
import {PATIENTS_DB_REF} from '../../../consts/DatabaseConsts';
import {Patient} from '../../../models/patient/patient';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.scss']
})
export class PatientsTableComponent implements OnInit {

  // Components variables
  searchValue = '';
  patientTableDataSource: MatTableDataSource<Patient> = new MatTableDataSource<Patient>([]);
  tableColumns: string[] = [
    'NumeroExpediente',
    'Nombres',
    'Apellidos',
    'Email',
    'Edad',
    'Sexo',
    'FechaIngreso',
    'TelefonoCasa',
    'TelefonoOficina',
    'TelefonoCelular',
    'Departamento',
    'Municipio',
    'Acciones'
  ];
  patientsCollection: AngularFirestoreCollection<Patient> = this.fs.collection<Patient>(PATIENTS_DB_REF);
  loadingPatients = true;

  // ViewChild Components
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public route: ActivatedRoute,
    public fs: AngularFirestore,
    public globalService: GlobalService
  ) {
    this.route.params.subscribe(async (params) => {
      this.patientsCollection = await this.fs.collection<Patient>(PATIENTS_DB_REF);
      this.patientsCollection.valueChanges().subscribe((patients) => {
        this.patientTableDataSource = new MatTableDataSource<Patient>(patients);
        this.applyFilter('');
        this.loadingPatients = false;
      });
    });
  }

  ngOnInit(): void {
    this.patientTableDataSource.paginator = this.paginator;
    this.patientTableDataSource.sort = this.sort;
  }

  // Method to search or apply filters to the table
  applyFilter(searchValue: string): void {
    this.patientTableDataSource.filter = searchValue.trim().toLowerCase();
    this.patientTableDataSource.paginator = this.paginator;
    this.patientTableDataSource.sort = this.sort;
  }

  // Method to open a modal
  openModal(modalType: string): void {

  }

  // Method to edit a patient
  editPatient(patientID: string | number): void {

  }

  // Method to delete a patient
  deletePatient(patientID: string | number): void {

  }

  // Method to print patient's proceedings
  /*printProceedings(patientID: string | number, index: number, patientName: string): void {

  }*/

  // Method to show a patient's info
  showPatient(patientID: string | number): void {

  }

  // Method to navigate to another view
  navigate(route: string): Promise<boolean> {
    return this.globalService.navigate(route);
  }
}
