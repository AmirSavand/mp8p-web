import { FormGroup } from '@angular/forms';
import { ApiError } from './api-error';

/**
 * Reactive form object for API
 */
export interface ReactiveFormData {
  id?: number;
  form?: FormGroup;
  loading?: boolean;
  error?: ApiError;
  errorStatus?: number;
  success?: boolean;
}
