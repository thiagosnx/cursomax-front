import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContributionService } from '../../../services/contribution.service';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrl: './contribution.component.css'
})
export class ContributionComponent implements OnInit {

  formContribution!: FormGroup;
  formPix!: FormGroup;

  constructor(
    private contributionService: ContributionService,
    private formBuilder: FormBuilder,
  ){ }

  ngOnInit(): void {
      this.formContribution = this.formBuilder.group({
        url: ['', Validators.compose([
          Validators.required,
          Validators.pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}.*$/)
        ])]
      })

      this.formPix = this.formBuilder.group({
        value: ['', Validators.compose([
          Validators.required
        ])]
      })
  }

}
