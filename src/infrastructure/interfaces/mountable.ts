export abstract class Mountable<T> {
  abstract mount(app: T): T;
}