import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [ButtonModule, RouterModule],
  templateUrl: './error.component.html',
})
export class ErrorComponent {

}
