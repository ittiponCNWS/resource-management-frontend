/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RolePermissionService } from './role-permission.service';

describe('Service: RolePermission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolePermissionService]
    });
  });

  it('should ...', inject([RolePermissionService], (service: RolePermissionService) => {
    expect(service).toBeTruthy();
  }));
});
