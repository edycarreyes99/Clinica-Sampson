import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  // Input variables
  @Input() title = '';
  @Input() dateTime = '';

  // Output variables
  @Output() toggleSidenav: EventEmitter<void>;

  constructor(
    private authService: AuthService,
    private globalService: GlobalService
  ) {
    this.toggleSidenav = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  // Method to logout
  async logout(): Promise<void> {
    await this.authService.logout().then(async (status) => {
      if (status) {
        await this.globalService.navigate('');
      }
    }).catch((error) => {
      console.log('Error logging out:', error);
    });
  }

}
