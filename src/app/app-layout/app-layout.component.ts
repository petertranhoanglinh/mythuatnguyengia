import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { TableConfig } from '../model/table-config';
import { OverlayLoadingState, getLoading } from '../selectors/overlay-loading.selector';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  show$: Observable<boolean>; // Changed to Observable<boolean>
  show: boolean = false;
  private showSubscription: Subscription | undefined;  // To manage the subscription

  constructor(private http: HttpService, private overlayLoadingStore: Store<OverlayLoadingState>) {
    this.show$ = this.overlayLoadingStore.select(getLoading);
  }

  ngOnInit(): void {
    this.showSubscription = this.show$.subscribe(res => {
      this.show = res;
      const preloader = document.querySelector('#preloader');
      if (preloader) {
          if (res) {
              preloader.classList.remove('hidden-preloader'); // or preloader.style.display = 'block'
          } else {
              preloader.classList.add('hidden-preloader');  // or preloader.style.display = 'none'
          }
      }
    });
  }


  ngOnDestroy(): void {
    // IMPORTANT: Unsubscribe to prevent memory leaks
    if (this.showSubscription) {
      this.showSubscription.unsubscribe();
    }
  }
}
