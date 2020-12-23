interface Options {
  id?: string;
}

export class Collection<T> {
  private _list: T[] = [];
  private _id: string;

  constructor(item: Array<T>, options?: Options) {
    if (options) {
      this._id = options.id;
    }

    this._list = item || [];
  }

  add(item: T): number {
    this._list.push(item);
    return this._list.length;
  }

  getItemByIndex(idx: number): T {
    return this._list[idx];
  }

  reverse(): T[] {
    return this._list.reverse();
  }

  sort(sortFn: (a: T, b: T) => number): T[] {
    return this._list.sort(sortFn);
  }

  deleteByIdx(idx: number): T[] {
    const h = this._list.splice(idx, 1);
    return this._list;
  }

  deleteByUniqueId(id: string | number) {
    const idx = this._list.findIndex(elem => elem[this._id] === id);

    return this._list;
  }

  getById(id: string | number): T | null {
    if (!this._id) {
      throw new Error("No Id set in the options");
    }
    const r = this._list.find(e => e[this._id] == id);
    return r;
  }

  pop(): T {
    return this._list.pop();
  }

  indexByCategories(fn: Function, init = {}): { [key: string]: T[] } {
    const r = init;
    const list = this._list;

    list.forEach(item => {
      if (r.hasOwnProperty(fn(item))) {
        r[fn(item)].push(item);
      } else {
        r[fn(item)] = [item];
      }
    });

    return r;
  }

  get size() {
    return this._list.length;
  }
}

export class Model {
  has(attr: string) {
    return this.hasOwnProperty(attr);
  }

  get(attr: string): Error | any {
    if (!this.has(attr)) {
      throw new Error("Attribute does not available");
    }
    return this[attr];
  }

  beforeSet() {}
  afterSet() {}
}
