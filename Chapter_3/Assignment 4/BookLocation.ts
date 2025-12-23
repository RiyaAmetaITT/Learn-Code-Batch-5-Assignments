export class BookLocation {
    private shelfNumber: string;
    private roomNumber: string;

    constructor(shelfNumber: string, roomNumber: string) {
        this.shelfNumber = shelfNumber;
        this.roomNumber = roomNumber;
    }

    getLocation(): string {
        return `Shelf: ${this.shelfNumber}, Room: ${this.roomNumber}`;
    }
}

