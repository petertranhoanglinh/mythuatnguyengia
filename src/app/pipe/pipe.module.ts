import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundPipe } from './round.pipe';
import { SafePipe } from './safe.pipe';



@NgModule({
  declarations: [RoundPipe, SafePipe ],
  imports: [
    CommonModule
  ],
  exports:[
    RoundPipe  , SafePipe
  ]

})
export class PipeModule { }
