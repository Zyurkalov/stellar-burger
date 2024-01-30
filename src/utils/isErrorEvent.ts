export const isErrorEvent = (event: Event | ErrorEvent): event is ErrorEvent => {
    return (event as ErrorEvent).message !== undefined;
  }