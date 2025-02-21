import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
 ],
  imports: [

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [ 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
})
export class MatModule { }