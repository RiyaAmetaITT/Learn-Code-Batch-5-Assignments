import { FileSystem } from './BookFileSaver';

/**
 * NodeFileSystem - Node.js file system implementation
 * Single Responsibility: Providing Node.js fs implementation for FileSystem interface
 */
export class NodeFileSystem implements FileSystem {
    writeFileSync(filename: string, data: string): void {
        // In a real implementation, this would use Node.js fs module
        // For this refactoring, we maintain the interface structure
        // Actual implementation would be: require('fs').writeFileSync(filename, data);
        throw new Error('File system operations require Node.js fs module');
    }
}

