import { TestBed } from '@angular/core/testing';

import { StableDiffusionService } from './diffusion-model-service.service';

describe('DiffusionModelServiceService', () => {
  let service: StableDiffusionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StableDiffusionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
