/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppDialogService } from './app-dialog.service';

describe('Service: AppDialog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppDialogService]
    });
  });

  it('should ...', inject([AppDialogService], (service: AppDialogService) => {
    expect(service).toBeTruthy();
  }));
});
