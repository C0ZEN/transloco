import { fakeAsync } from '@angular/core/testing';
import { createService, runLoader } from '../transloco.mocks';

describe('selectTranslationObject', () => {
  let service;

  beforeEach(() => (service = createService()));

  it('should return an object', fakeAsync(() => {
    const spy = jasmine.createSpy();
    service.selectTranslateObject('a').subscribe(spy);
    runLoader();
    expect(spy).toHaveBeenCalledWith({ b: { c: 'a.b.c {{fromList}} english' } });
  }));

  it('should work with scope', fakeAsync(() => {
    const spy = jasmine.createSpy();
    service.selectTranslateObject('obj', {}, 'lazy-page').subscribe(spy);
    runLoader();
    expect(spy).toHaveBeenCalledWith({ a: { b: 'a.b english' } });
  }));

  it('should work with scope and lang', fakeAsync(() => {
    const spy = jasmine.createSpy();
    service.selectTranslateObject('obj', {}, 'lazy-page/es').subscribe(spy);
    runLoader();
    expect(spy).toHaveBeenCalledWith({ a: { b: 'a.b spanish' } });
  }));

  it('should return a nested object', fakeAsync(() => {
    const spy = jasmine.createSpy();
    service.selectTranslateObject('a.b').subscribe(spy);
    runLoader();
    expect(spy).toHaveBeenCalledWith({ c: 'a.b.c {{fromList}} english' });
  }));

  it('should listen to lang changes', fakeAsync(() => {
    const spy = jasmine.createSpy();
    service.selectTranslateObject('a.b').subscribe(spy);
    runLoader();
    expect(spy).toHaveBeenCalledWith({ c: 'a.b.c {{fromList}} english' });
    service.setActiveLang('es');
    runLoader();
    expect(spy).toHaveBeenCalledWith({ c: 'a.b.c {{fromList}} spanish' });
  }));

  it('should support params', fakeAsync(() => {
    const spy = jasmine.createSpy();
    service.selectTranslateObject('a.b', { c: { fromList: 'Hello' } }).subscribe(spy);
    runLoader();
    expect(spy).toHaveBeenCalledWith({ c: 'a.b.c Hello english' });
  }));
});
