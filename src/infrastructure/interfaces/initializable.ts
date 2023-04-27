export abstract class Initializable<T> {
  abstract init(app?: T): T | void | Promise<T | void>;
}
