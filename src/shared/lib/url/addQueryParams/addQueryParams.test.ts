import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
  test('test with one param', () => {
    const params = getQueryParams({
      test: 'value',
    });
    expect(params).toEqual('?test=value');
  });
  test('test with multiply param', () => {
    const params = getQueryParams({
      test1: 'value1',
      test2: 'value2',
    });
    expect(params).toEqual('?test1=value1&test2=value2');
  });
  test('test with undefined', () => {
    const params = getQueryParams({
      test1: 'value1',
      test2: undefined,
    });
    expect(params).toEqual('?test1=value1');
  });
});
