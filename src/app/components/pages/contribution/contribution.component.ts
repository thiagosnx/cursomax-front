import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrl: './contribution.component.css'
})
export class ContributionComponent {

  formContribution!: FormGroup;
  formPix!: FormGroup;

}
