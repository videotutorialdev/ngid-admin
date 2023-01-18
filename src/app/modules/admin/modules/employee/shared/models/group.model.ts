export class GroupModel {
  private static instances: Array<GroupModel>;
  private constructor(public id: number, public name: string) {}

  public static getByName(groupName: string): GroupModel {
    if (!this.instances) this.createList();
    return this.instances.filter((group) => group.name === groupName)[0];
  }

  public static createList(): Array<GroupModel> {
    if (this.instances) return this.instances;
    const groups = ['A', 'B', 'C', 'D', 'E'];
    this.instances = groups.map(
      (group: string, id: number) => new GroupModel(id + 1, `Group ${group}`)
    );
    return this.instances;
  }
}
