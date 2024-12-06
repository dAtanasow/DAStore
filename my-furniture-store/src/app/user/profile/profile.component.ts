import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditingProfile } from '../../types/user';
import { NgIf } from '@angular/common';
import { emailValidator } from '../../utils/email-validator';
import { DOMAINS } from '../../constants';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  user: any = {};
  editing: EditingProfile = {
    username: false,
    email: false,
    phone: false,
  };

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe((data) => {
      this.user = data;

      this.form = this.fb.group({
        username: [
          this.user.username || '',
          [Validators.required, Validators.minLength(5)],
        ],
        email: [
          this.user.email || '',
          [Validators.required, emailValidator(DOMAINS)],
        ],
        phone: [this.user.phone || '', [Validators.pattern(/^0\d{9}$/)]],
      });
    });
  }

  isFieldTextMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  get isNotMinLength() {
    return (
      this.form.get('username')?.touched &&
      this.form.get('username')?.errors?.['minlength']
    );
  }

  get isEmailNotValid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['emailValidator']
    );
  }

  get isPhoneInvalid() {
    const phoneControl = this.form.get('phone');
    return phoneControl?.touched && phoneControl?.invalid;
  }

  editAllFields() {
    this.editing = {
      username: true,
      email: true,
      phone: true,
    };
  }

  toggleEdit() {
    if (this.editing.username || this.editing.email || this.editing.phone) {
      this.submitProfile();
    } else {
      this.editing = {
        username: true,
        email: true,
        phone: true,
      };
    }
  }

  submitProfile() {
    if (this.form?.valid) {
      const formValue = this.form.value;
      this.userService.updateProfile(formValue).subscribe(() => {
        this.user = { ...this.user, ...formValue };
        this.editing = {
          username: false,
          email: false,
          phone: false,
        };
      });
    }
  }
}
