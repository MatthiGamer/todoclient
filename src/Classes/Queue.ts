export class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    public enqueue = (item: T): void => {
        this.items.push(item);
    }

    public dequeue = (): T | undefined => {
        return this.items.shift();
    }

    public peek = (): T | undefined => {
        return this.items.length > 0 ? this.items[0] : undefined;
    }

    public isEmpty = (): boolean => {
        return this.items.length === 0;
    }

    public size = (): number => {
        return this.items.length;
    }

    public clear = (): void => {
        this.items = [];
    }
}