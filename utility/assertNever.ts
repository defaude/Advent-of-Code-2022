export const assertNever = (x: never): never => {
    throw new TypeError(`Did not expect to get this value ${x}`);
};
