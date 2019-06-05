import {Component} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';
import {HttpEvent} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

 // original
  onSaveData() {
    this.dataStorageService.storeARecipes()
      .subscribe((response: HttpEvent<{}>) => {
        // console.log((response));
      });
  }

  // onSaveData() {
  //   this.dataStorageService.storeARecipes()
  //     .subscribe(
  //       (response: HttpEvent<Object>) => {
  //         console.log((response.type === HttpEventType.DownloadProgress));
  //     });
  // }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogut() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
