import { CdkDatePipe } from './cdk-date-format.pipe';

describe('Pipe: TmDate', () => {
  it('create an instance', () => {
    let pipe = new CdkDatePipe();
    expect(pipe).toBeTruthy();
  });

  xit('should properly format a date', () => {
    const pipe = new CdkDatePipe();
    const result = pipe.transform('10/06/2019', 'fr', 'l');
    expect(result).toBe('6/10/2019');
  });

  it('should not format empty dates', () => {
    const pipe = new CdkDatePipe();

    const result1 = pipe.transform('', 'MMMM Do YYYY, h:mm:ss a');
    expect(result1).toBe('');

    const result2 = pipe.transform(null);
    expect(result2).toBe('');

    const result3 = pipe.transform(undefined);
    expect(result3).toBe('');
  });
});
