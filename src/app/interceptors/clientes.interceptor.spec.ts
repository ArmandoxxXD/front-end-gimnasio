import { TestBed } from '@angular/core/testing';

import { ClientesInterceptor } from './clientes.interceptor';

describe('ClientesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ClientesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ClientesInterceptor = TestBed.inject(ClientesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
