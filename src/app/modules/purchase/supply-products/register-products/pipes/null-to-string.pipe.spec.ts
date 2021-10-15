import { NullToStringPipe } from './null-to-string.pipe';

describe('NullToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new NullToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
