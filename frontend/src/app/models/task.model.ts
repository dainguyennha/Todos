export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public checked: boolean,
    public total_item: number,
    public checked_item: number
  ){}
}
