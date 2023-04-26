import { Application } from "express";

export abstract class Mountable {
  abstract mount(app: Application): Application;
}