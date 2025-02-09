import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContributionService } from '../../../services/contribution.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrl: './contribution.component.css'
})
export class ContributionComponent implements OnInit {

  formContribution!: FormGroup;
  formPix!: FormGroup;
  qr_code? :string = '';
  copia_cola? :string = '';

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
        valor: ['', Validators.compose([
          Validators.required
        ])]
      })
  }
  contribuir():void{
    if(this.formContribution.valid){
      this.contributionService.createContribution(this.formContribution.value).subscribe({
        next : value => {
            alert("Curso:" + value)
        },
        error: err =>{
          console.log(err);
          
        }
      })
    }
  }
  doar():any{
    if(this.formPix.valid){
      this.contributionService.createDonation(this.formPix.value).subscribe({
        next: res => {
          this.qr_code = res.qr_code_base64;
          this.copia_cola = res.qr_code;
        },
        error: err => {
            console.log(err);
            
        },
      });
    }    
  }

  copiar():void{
    if(this.copia_cola){
      navigator.clipboard.writeText(this.copia_cola).then(()=>{
        alert('Copiado para a área de transferência');
      })
    }
  }

}
