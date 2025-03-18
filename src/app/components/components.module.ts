import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableTemplateComponent } from './table-template/table-template.component';
import { PagingComponent } from './paging/paging.component';
import { MeterialModule } from '../meterial/meterial.module';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PopupComponent } from './popup/popup.component';
import { ProductComponent } from './product/product.component';
import { PipeModule } from '../pipe/pipe.module';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import { SliderComponent } from './slider/slider.component';
import { MessageButtonComponent } from './message-button/message-button.component';
import { CkContentComponent } from './ck-content/ck-content.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { VideoComponent } from './video/video.component';
import { PagingCustomComponent } from './paging-custom/paging-custom.component';
import { MetamaskConnectComponent } from './metamask-connect/metamask-connect.component';
import { UploadMutiImageComponent } from './upload-muti-image/upload-muti-image.component';
@NgModule({
  declarations: [
    TableTemplateComponent,
    PagingComponent,
    ImageUploadComponent,
    PageNotFoundComponent,
    PopupComponent,
    ProductComponent,
    CustomDialogComponent,
    SliderComponent,
    MessageButtonComponent,
    CkContentComponent,
    VideoComponent,
    PagingCustomComponent,
    MetamaskConnectComponent,
    UploadMutiImageComponent


  ],
  imports: [
    CommonModule,
    MeterialModule,
    PipeModule,
    CKEditorModule,
    FormsModule

  ]
  ,
  exports:[
    TableTemplateComponent,
    ImageUploadComponent,
    PagingComponent,
    PopupComponent,
    ProductComponent,
    SliderComponent,
    MessageButtonComponent,
    CkContentComponent,
    VideoComponent,
    PagingCustomComponent,
    MetamaskConnectComponent,
    UploadMutiImageComponent
  ],
})
export class ComponentsModule { }
