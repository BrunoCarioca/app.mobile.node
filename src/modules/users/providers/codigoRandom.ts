export function codigoRandom(): number {
    const min = 1000,
        max = 10000;

    return Math.floor(Math.random() * (max - min) + min);
}
