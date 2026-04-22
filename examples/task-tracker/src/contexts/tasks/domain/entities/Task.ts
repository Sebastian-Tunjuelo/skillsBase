export type TaskStatus = "pending" | "completed";

export interface TaskProps {
  id: string;
  title: string;
  status: TaskStatus;
}

export class Task {
  constructor(private readonly props: TaskProps) {}

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get status(): TaskStatus {
    return this.props.status;
  }
}
