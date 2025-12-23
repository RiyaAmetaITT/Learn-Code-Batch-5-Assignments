import { FileSystem } from './BookFileSaver';

export class NodeFileSystem implements FileSystem {
    writeFileSync(filename: string, data: string): void {
        throw new Error('File system operations require Node.js fs module');
    }
}

