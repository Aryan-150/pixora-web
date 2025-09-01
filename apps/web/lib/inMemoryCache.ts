import { Shapes } from "./types";

interface InMemoryFuncs {
  addShape: () => void;
  removeShape(): void;
}

export class InMemoryCache implements InMemoryFuncs {
  private static instance: InMemoryCache;
  private ShapesInRooms: Record<string, Shapes[]> = {};

  private constructor() {
    this.ShapesInRooms = {};
  }

  public static getInstance() {
    if(!InMemoryCache.instance){
      InMemoryCache.instance = new InMemoryCache();
    }
    return InMemoryCache.instance;
  }

  public addShape() {

  }

  public removeShape() {

  }

  public getShapes(roomId: string) {
    try {
      if(!this.ShapesInRooms[roomId]) throw new Error("the room does not exists...!");
      
      return this.ShapesInRooms[roomId];
    } catch (error: any) {
      console.error(error.toString());
    }
  }



}