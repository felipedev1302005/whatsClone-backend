import assert from 'assert'
function sum (a: number, b: number): number {
  return a + b
}
describe('sum', () => {
  it('should return 3 when sum 1 + 2', () => {
    assert.strictEqual(sum(1, 2), 3)
  })
})
