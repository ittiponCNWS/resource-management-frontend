/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminSettingService } from './admin-setting.service';

describe('Service: AdminSetting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminSettingService]
    });
  });

  it('should ...', inject([AdminSettingService], (service: AdminSettingService) => {
    expect(service).toBeTruthy();
  }));
});
