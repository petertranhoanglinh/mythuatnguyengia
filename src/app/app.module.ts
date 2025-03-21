import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from './components/components.module';
import { Interceptors } from './service/interceptors.service';
import { overlayLoadingFeatureKey, overlayLoadingReducer } from './reducers/overlay-loading.reducer';
import { Title } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    StoreModule.forRoot({}),
     StoreModule.forFeature(overlayLoadingFeatureKey, overlayLoadingReducer),
    EffectsModule.forRoot([]),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // Thay đổi vị trí ở đây
    }), // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptors,
      multi: true
    },
    [Title]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
