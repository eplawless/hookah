const useMemo = require('./use-memo');

test('useMemo runs our function to get a result', () => {
    const value = useMemo(() => 10, [true]);
    expect(value).toBe(10);
});

test('useMemo reuses its previous result', () => {
    let callCount = 0;
    function action() {
        const value = useMemo(() => { ++callCount; return 10; }, [true]);
        expect(value).toBe(10);
    }
    action();
    action();
    expect(callCount).toBe(1);
});

test('useMemo can be called twice on the same line', () => {
    const x = useMemo(() => 10, [true]); const y = useMemo(() => 20, [true]);
    expect(x).toBe(10);
    expect(y).toBe(20);
});

test('useMemo can be called inside a branch without fucking anything up', () => {
    let callCount = 0;
    function action(takeBranch) {
        const v1 = useMemo(() => { ++callCount; return 10 }, [true]);
        expect(v1).toBe(10);
        if (takeBranch) {
            const v2 = useMemo(() => { ++callCount; return 20; }, [true]);
            expect(v2).toBe(20);
        }
        const v3 = useMemo(() => { ++callCount; return 30; }, [true]);
        expect(v3).toBe(30);
    }
    expect(callCount).toBe(0);
    action(false);
    expect(callCount).toBe(2);
    action(false);
    expect(callCount).toBe(2);
    action(true);
    expect(callCount).toBe(3);
});
