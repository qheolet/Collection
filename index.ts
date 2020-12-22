import { Model, Collection } from "./library";

export class DateValue {
  private _date: Date;
  constructor(date) {
    this._date = new Date(date);
  }

  get date(): Date {
    return this.date;
  }
}
export type categories = string[];

export class Task extends Model {
  date: DateValue;
  id: string = "";
  description = "";
  done: boolean = false;
  categories: categories;

  constructor({ date, id, description, categories, done }) {
    super();
    this.date = new DateValue(date);
    this.id = id;
    this.description = description;
    this.categories = categories;
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }

  beforeSet() {
    console.log("before set");
  }
  afterSet() {
    console.log("after eset");
  }
}

const task = new Task({
  date: "june 12, 2020",
  id: "1",
  description: "Comococmoc 1",
  categories: ["a"],
  done: true
});
const task1 = new Task({
  date: "june 13, 2020",
  id: "2",
  description: "Comococmoc 2",
  categories: ["a", "b"],
  done: false
});
const task2 = new Task({
  date: "june 14, 2020",
  id: "3",
  description: "Comococmoc 3",
  categories: ["c"],
  done: false
});

const collection = new Collection<Task>([task1, task2, task], { id: "id" });

console.log("3", collection.getById("3"));

console.log(
  collection.indexBy(
    (x: Task) => {
      return x.done ? "done" : "undone";
    },
    {
      undone: [],
      done: []
    }
  )
);
