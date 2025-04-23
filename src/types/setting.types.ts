export class Printer {
  id: number;
  label: string;
  status: number | 0 | 1 | -1;

  constructor(id: number, label: string, status: number | 0 | 1 | -1) {
    this.id = id;
    this.label = label;
    this.status = status;
  }

  public get statusCategory(): string {
    switch (this.status) {
      case 1:
        return "Available";

      case 0:
        return "Idle";

      default:
        return "Unavailable";
    }
  }
}
