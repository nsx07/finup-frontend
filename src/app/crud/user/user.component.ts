import { Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBaseComponent } from '../../shared/form-base.component';
import { FormBuilder } from '@angular/forms';
import { FormValidators } from '../../shared/form-validators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends FormBaseComponent implements OnInit {
  
  constructor(private fb: FormBuilder) {
    super();
  }
  
  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, FormValidators.passwordValidator]],
      confirm: ["", [Validators.required, FormValidators.equalsTo("password")]]
    });
  }
  
  override submit(): void {
    
  }

}
