export function codigoRandom(): number {
    const min = 1000000,
        max = 100000000;

    return Math.floor(Math.random() * (max - min) + min);
}
