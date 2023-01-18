export class StatusModel {
  private static instances: Array<StatusModel>;
  private constructor(public id: number, public name: string) {}

  public static getByName(name: string): StatusModel {
    if (!this.instances) this.createList();
    return this.instances.filter((status) => status.name === name)[0];
  }

  public static createList(): Array<StatusModel> {
    if (this.instances) return this.instances;
    const statuses = ['Active', 'Terminated', 'Resigned'];
    this.instances = statuses.map(
      (status: string, id: number) => new StatusModel(id + 1, status)
    );
    return this.instances;
  }
}
