import {Product} from "../models/product";

export interface CartEntry{
  prod : Product;
  qty : number;
}