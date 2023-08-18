import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/app/shared/interfaces/player';
import { ReactiveFormData } from 'src/app/shared/interfaces/reactive-form-data';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  readonly form: ReactiveFormData = {
    form: this.formBuilder.group({
      name: ['', Validators.required],
    }),
  };

  constructor(private formBuilder: UntypedFormBuilder,
              private api: ApiService,
              public router: Router) {
  }

  submit(): void {
    this.form.loading = true;
    this.api.register(this.form.form.value).subscribe((data: Player): void => {
      localStorage.player = data.id;
      localStorage.name = data.name;
      this.router.navigateByUrl('/');
    }, (): void => {
      this.form.loading = false;
    });
  }
}
