import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormBaseComponent } from '../../shared/form-base.component';
import { FormValidators } from '../../shared/form-validators';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent extends FormBaseComponent implements OnInit {
  
  constructor(private fb: FormBuilder) {
    super();
  }
  
  ngOnInit(): void {
    this.createForm();
  }
  
  private createForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      value: [0, [Validators.required]],
      status: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      finishDate: ["", [Validators.required]],
      description: ["", [Validators.required]]
    });
  }

  override submit(): void {
    throw new Error('Method not implemented.');
  }
}
