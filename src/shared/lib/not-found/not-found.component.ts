import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [ButtonModule, RouterModule],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {

}
