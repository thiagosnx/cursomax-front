import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContributionService } from '../../../services/contribution.service';
import { ToastrService } from 'ngx-toastr';

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
  loading : boolean = false;

  constructor(
    private contributionService: ContributionService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
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
          this.toastr.success('Contribuição enviada com sucesso', 'Obrigado!');
        },
        error: err =>{
          this.toastr.error('Algo deu errado com a solicitação. Se o erro persistir, contate o suporte.', 'Erro :(')
          
        }
      })
    }
  }
  doar():any{
    this.loading = true;
    if(this.formPix.valid){
      this.contributionService.createDonation(this.formPix.value).subscribe({
        next: res => {
          this.qr_code = res.qr_code_base64;
          this.copia_cola = res.qr_code;
        },
        error: err => {
            this.toastr.error('Algo deu errado com a solicitação. Se o erro persistir, contate o suporte.', 'Erro :(')
            
        },
        complete: () => {
            this.loading = false;
        }
      });
    }    
  }

  copiar():void{
    if(this.copia_cola){
      navigator.clipboard.writeText(this.copia_cola).then(()=>{
        this.toastr.success('Código copiado para a área de transferência!');
      })
    }
  }

}
