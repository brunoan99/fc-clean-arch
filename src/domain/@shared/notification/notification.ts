export type NotificationError = {
  message: string;
  context: string;
}

export class Notification {
  private errors: NotificationError[] = [];

  addError(error: NotificationError) {
    this.errors.push(error);
  }

  messages(context?: string) {
    return this.errors
      .filter((error) => error.context === context || context === undefined)
      .map((error) => `${error.context}: ${error.message}`)
      .join(",")
  }
}