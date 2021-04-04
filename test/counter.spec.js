import { createCounter } from '../src/counter';

// Step 1
describe('옵션이 지정되지 않은 경우', () => {
  let counter;
  beforeEach(()=>{
    counter = createCounter()
  })
  
  it('초기값은 0이다.', () => {
    expect(counter.val()).toBe(0)
    
  });
  
  it('inc() 함수는 값을 1증가시킨다.', () => {    const counter = createCounter()
    counter.inc()
    expect(counter.val()).toBe(1)
  });

  it('dec() 함수는 값을 1감소시킨다.', () => {
    counter.dec()
    expect(counter.val()).toBe(-1)
  });

  it('isMax() 호출시 false를 반환한다.', () => {
    expect(counter.isMax()).toBe(false)
  });
  
  it('isMin() 호출시 false를 반환한다.', () => {
    expect(counter.isMin()).toBe(false)
    
  });
});

// Step 2
it('initValue 옵션 사용 시 초기값이 해당 값으로 지정된다.', () => {
  const option = {
    initVal:123
  }
  const counter = createCounter(option)
  expect(counter.val()).toBe(option.initVal)
});

describe('min 옵션 사용 시 현재값과 min 값이 동일하면', () => {
  let counter;
  beforeEach(()=>{
    counter = createCounter({initVal:6,min:6})
  })
  it('dec() 함수를 호출해도 값이 감소하지 않는다.', () => {
    const beforeDec = counter.val()  
    counter.dec()
    const afterDec = counter.val()
    expect(beforeDec).toBe(afterDec)
    
  });
  
  it('isMin() 호출 시 true를 반환한다.', () => {
    expect(counter.isMin()).toBe(true)
  });
});

describe('max 옵션 사용 시 현재값과 max 값이 동일하면', () => {
  let counter;
  beforeEach(()=>{
    counter = createCounter({initVal:2,max:2})
    
  })
  
  it('inc() 함수를 호출해도 값이 증가하지 않는다.', () => {
    const beforeInc = counter.val()  
    counter.inc()
    const afterInc = counter.val()
    expect(beforeInc).toBe(afterInc)
  });
  
  it('isMax() 호출 시 true를 반환한다.', () => {
    expect(counter.isMax()).toBe(true)
    
  });
});
