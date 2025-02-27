import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundPipe } from './round.pipe';
import { SafePipe } from './safe.pipe';
import { SetCommaPipe } from './set-comma.pipe';


@NgModule({
  declarations: [RoundPipe, SafePipe , SetCommaPipe ],
  imports: [
    CommonModule
  ],
  exports:[
    RoundPipe  , SafePipe , SetCommaPipe
  ]

})
export class PipeModule { }
