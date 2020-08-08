import { of, Observable, BehaviorSubject } from 'rxjs'; 
// import { map } from 'rxjs/operators';


export class Collection<T>{
  private _list : BehaviorSubject<Array<T>> = new BehaviorSubject([]);
  private _id : string;

  constructor(item: Array<T>, options?: {id: string}){
    if (options) {
      this._id = options.id;
    }
    
    
    this.set(item);

  } 

  add(item: T): number{
    const r = this.snapshot
    r.push(item);
    this._list.next(r);
    return this.snapshot.length;
  }

  getItemByIndex(idx: number):T {
    return this.snapshot[0];
  }

  set(item:Array<T>): number{
    this._list.next(this.snapshot.concat(item))
    return this.snapshot.length;
  }

  getById(id:string){
    if (!this._id) {
      throw new Error('Need to set the id attr');
    }
    const r = this.snapshot;
    const find =  r.filter((e)=>{
      return e[this._id]===id;
    });

    return find.length? find[0] : undefined;
  }

  reverse(): BehaviorSubject<Array<T>> {}
  sort(property:string,order: 'asc'|'dsc'): T{}
  query(): T{}
  delete(idx: number): T{}
  pop(): T{}
  switch(): boolean{}
  indexBy(property:string): {[key:string] : T} {
    const r = {};

    this._list
    
    return r;
  }

  getObservable(){
    return this._list;
  }


  get size(){
    return this.snapshot.length;
  }

  get snapshot(){
    return this._list.getValue();
  }

}
export class Model{

  has(attr: string){
    return this.hasOwnProperty(attr);
  }

  get(attr:string): Error | any{
    if(!this.has(attr)) {
     throw new Error('Attribute does not available');
    }
    return this[attr];
  }

  
  beforeSet(){}
  afterSet(){}



}
export class DateValue{
  private _date: Date;
  constructor(date){
    this._date = new Date(date);
  }

  get date(): Date{
    return this.date
  }

}
export class Task extends Model{
  date: DateValue;
  id: string = '';
  description = '';
  done: boolean = false;

  constructor({date, id, description}){
    super();
    this.date = new DateValue(date);
    this.id = id;
    this.description = description;
  }

  toggle(){
    this.done = !this.done;
  }

  beforeSet(){
    console.log('before set')
  }
  afterSet(){
    console.log('after eset')
  }
}

const task = new Task({
  date:'june 12, 2020',
  id:'1',
  description:'Comococmoc 1'
});
const task1 = new Task({
  date:'june 13, 2020',
  id:'2',
  description:'Comococmoc 2'
});
const task2 = new Task({
  date:'june 14, 2020',
  id:'3',
  description:'Comococmoc 3'
});

console.log(task)
console.log(task1)
console.log(task2)

const collection = new Collection<Task>([task1,task2], {id:'id'})

console.log(collection);
collection.add(task)
console.log(collection.getItemByIndex(0).description);
collection.set([task1,task2])
console.log('costructor',collection.getById('2').constructor.name);
console.log(collection.snapshot);
