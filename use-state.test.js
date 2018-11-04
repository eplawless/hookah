const useState = require('./use-state');

test('useState passes along the initial state', () => {
  const [state, setState] = useState(123);
  expect(state).toBe(123);
});

test('useState gives back a setState function which updates the state next run', () => {
  function action() {
    const [state, setState] = useState(0);
    setState(state + 1);
    return state;
  }
  const state1 = action();
  expect(state1).toBe(0);
  const state2 = action();
  expect(state2).toBe(1);
  const state3 = action();
  expect(state3).toBe(2);
});

test('useState can accept an initializer function instead of initial value', () => {
  let callCount = 0;
  function action() {
    const [state, setState] = useState(() => { ++callCount; return 1234; });
    expect(state).toBe(1234);
  }
  expect(callCount).toBe(0);
  action();
  expect(callCount).toBe(1);
  action();
  expect(callCount).toBe(1);
});

test('setState can accept a function instead of a value', () => {
  function action() {
    const [state, setState] = useState(100);
    setState(prevState => prevState + 1);
    return state;
  }
  const state1 = action();
  expect(state1).toBe(100);
  const state2 = action();
  expect(state2).toBe(101);
  const state3 = action();
  expect(state3).toBe(102);
});

test('setState can be called twice on the same line without breaking', () => {
  function action() {
    const [x, setX] = useState(100); const [y, setY] = useState(200);
    setX(x => x + 1);
    setY(y => y + 1);
    return [x, y];
  }
  const [x1, y1] = action();
  expect(x1).toBe(100);
  expect(y1).toBe(200);
  const [x2, y2] = action();
  expect(x2).toBe(101);
  expect(y2).toBe(201);
  const [x3, y3] = action();
  expect(x3).toBe(102);
  expect(y3).toBe(202);
});
