export class Item {
    name: string;
    wiki?: string;
    icon?: string;
    categories: string[];

    static items: Record<string, Item> = {};

    private constructor(opts: { name: string; wiki?: string; icon?: string; categories: string[] }) {
        this.name = opts.name;
        this.wiki = opts.wiki;
        this.icon = opts.icon;
        this.categories = opts.categories;
        Item.items[opts.name] = this;
    }

    static getOrCreate(opts: { name: string; wiki?: string; icon?: string; categories: string[] }): Item {
        if (Item.items[opts.name]) {
            return Item.items[opts.name];
        }
        return new Item(opts);
    }
}