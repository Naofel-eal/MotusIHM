export function copy(object: any) {
    return typeof object === 'object' && object !== null ? JSON.parse(JSON.stringify(object)) : object;
}