import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';
import {PATIENTS_DB_REF} from '../../../consts/DatabaseConsts';
import {GlobalService} from '../../../services/global.service';
import {IPatient} from '../../../interfaces/ipatient';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.scss']
})
export class PatientsTableComponent implements OnInit, AfterViewInit {

  // Components variables
  searchValue = '';
  patientTableDataSource: MatTableDataSource<IPatient>;
  tableColumns: string[] = [
    'NumeroExpediente',
    'Nombres',
    'Apellidos',
    'Email',
    'Edad',
    'Telefono',
    'Acciones'
  ];
  patientsCollection: AngularFirestoreCollection<IPatient> = this.fs.collection<IPatient>(PATIENTS_DB_REF);
  loadingPatients = true;

  // ViewChild Components
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public route: ActivatedRoute,
    public fs: AngularFirestore,
    public globalService: GlobalService
  ) {
    this.route.params.subscribe(async (params) => {
      this.patientsCollection = await this.fs.collection<IPatient>(PATIENTS_DB_REF,
        (result) => result
          .orderBy('PatientID', 'asc')
          .orderBy('Nombres', 'asc')
          .orderBy('Apellidos', 'desc')
      );
      this.patientsCollection.valueChanges().subscribe((patients) => {
        this.patientTableDataSource = new MatTableDataSource<IPatient>(patients);
        this.applyFilter(this.searchValue);
        this.loadingPatients = false;
      });
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  // Method to search or apply filters to the table
  applyFilter(searchValue: string): void {
    this.patientTableDataSource.filter = searchValue.trim().toLowerCase();
    this.patientTableDataSource.paginator = this.paginator;
    this.patientTableDataSource.sort = this.sort;

    if (this.patientTableDataSource.paginator) {
      this.patientTableDataSource.paginator.firstPage();
    }
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
