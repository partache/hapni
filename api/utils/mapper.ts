export function mapErrors(err: Error) {
    if (Array.isArray(err)) {
        return err.join('\n');
    } else if (err.message) {
        return err.message;
    } else {
        return 'Request error';
    }
}