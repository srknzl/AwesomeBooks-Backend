import { RequestHandler } from "express";
import { Product, ProductInterface } from "../../models/product";
import { CartItem, CartItemInterface } from "../../models/cartitem";
import { CartInterface } from "../../models/cart";
import { Order, OrderInterface } from "../../models/order";
import { Op } from "sequelize";

export const getProducts: RequestHandler = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("user/products", {
        pageTitle: "Products",
        prods: products,
        active: "products"
      });
    })
    .catch(err => {
      throw err;
    });
};
export const getShop: RequestHandler = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("user/shop", {
        pageTitle: "Shop",
        prods: products,
        active: "shop"
      });
    })
    .catch(err => {
      throw err;
    });
};
export const getOrders: RequestHandler = (req, res, next) => {
  interface orderDataInterface {
    product: ProductInterface | undefined; // If product could not found.
    address: string;
    quantity: number;
    date: string;
    time: string;
  }

  const viewData: orderDataInterface[] = [];
  const ordersArray: OrderInterface[] = [];

  Order.findAll({
    where: {
      userId: (req as any).user.id
    },
    order: [["createdAt", "ASC"]]
  })
    .then(orders => {
      let ids: any = [];
      for (const order of orders) {
        ordersArray.push(order);
        ids.push((order as any).productId);
      }
      return Product.findAll({
        where: {
          id: {
            [Op.or]: ids
          }
        },
        order: [["id", "ASC"]]
      });
    })
    .then(products => {
      let counter = 0;
      for (const order of ordersArray) {
        const product = products.find(prod => prod.id === order.productId);

        const date = order.createdAt;

        const zeroPadder = (n : number) : string | number => {
          if(n < 10){
            return '0' + n.toString();
          }else {
            return n;
          }
        }

        const day: number| string= zeroPadder(date.getDate());
        const month: number| string= zeroPadder(date.getMonth());
        const year : number| string= zeroPadder(date.getFullYear());

        const hours: number| string= zeroPadder(date.getHours());
        const minutes: number| string= zeroPadder(date.getMinutes());
        const seconds: number| string= zeroPadder(date.getSeconds());

        const formattedDate = `${day}/${month}/${year}` 
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        viewData.push({
          product: product,
          address: order.address,
          quantity: order.quantity,
          date: formattedDate,
          time: formattedTime
        });
        counter++;
      }
    })
    .then(() => {
      res.render("user/orders", {
        pageTitle: "Orders",
        orders: viewData,
        active: "orders"
      });
    })
    .catch(err => {
      throw err;
    });
};
export const getWelcome: RequestHandler = (req, res, next) => {
  res.render("user/welcome", {
    pageTitle: "Welcome",
    active: "welcome"
  });
};
export const getProductDetail: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then(product => {
      if (product) {
        res.render("user/view-product", {
          pageTitle: "Product Detail",
          active: "products",
          product: product
        });
      } else {
        res.redirect("/notfound");
      }
    })
    .catch(err => {
      throw err;
    });
};
export const getCart: RequestHandler = (req, res, next) => {
  let items: any;

  (req as any).user
    .getCart()
    .then((cart: CartInterface) => {
      return (cart as any).getProducts();
    })
    .then((products: Array<ProductInterface>) => {
      items = products;
      let price = 0;
      items.forEach((prod: ProductInterface) => {
        price += Number(prod.price) * Number((prod as any).cartitem.quantity);
      });
      return price;
    })
    .then((price: number) => {
      res.render("user/cart", {
        pageTitle: "Cart",
        active: "cart",
        entries: items,
        price: price
      });
    })
    .catch();
};

export const addToCart: RequestHandler = (req, res, next) => {
  let fetchedProduct: ProductInterface;
  let fetchedCart: CartInterface;
  Product.findByPk(req.body.id)
    .then(product => {
      if (product) {
        fetchedProduct = product;
        return (req as any).user.getCart();
      } else {
        throw new Error(
          "No such product in product table to be added to the cart:" +
            req.body.id
        );
      }
    })
    .then(cart => {
      fetchedCart = cart;
      return CartItem.findAll({
        where: {
          productId: fetchedProduct.id,
          cartId: cart.id
        }
      });
    })
    .then(cartitems => {
      if (cartitems.length > 0) {
        cartitems[0].quantity++;
        cartitems[0].save();
        return cartitems[0];
      } else {
        return CartItem.create({
          quantity: 1,
          productId: fetchedProduct.id,
          cartId: fetchedCart.id
        });
      }
    })
    .then(cartitem => {
      res.redirect("/user/cart");
    })
    .catch(err => {
      throw err;
    });
};
export const removeFromCart: RequestHandler = (req, res, next) => {
  const id = req.body.id;
  (req as any).user
    .getCart()
    .then((cart: CartInterface) => {
      return CartItem.findAll({
        where: {
          productId: id,
          cartId: cart.id
        }
      });
    })
    .then((cartitems: CartItemInterface[]) => {
      if (cartitems.length > 0) {
        if (cartitems[0].quantity > 1) {
          cartitems[0].quantity--;
          return cartitems[0].save();
        } else {
          return cartitems[0].destroy();
        }
      } else {
        throw new Error("No such product to delete from the cart");
      }
    })
    .then(() => {
      res.redirect("/user/cart");
    })
    .catch((err: Error) => {
      throw err;
    });
};
export const addOrder: RequestHandler = (req, res, next) => {
  let fetchedCart: CartInterface;

  (req as any).user
    .getCart()
    .then((cart: CartInterface) => {
      if (cart) {
        fetchedCart = cart;
        return CartItem.findAll({
          where: {
            cartId: cart.id
          },
          include: [{ model: Product }]
        });
      } else {
        throw new Error("There is no cart of the current user!!");
      }
    })
    .then((cartitems: CartItemInterface[]) => {
      let orders: any = [];
      cartitems.forEach(cartitem => {
        orders.push({
          quantity: cartitem.quantity,
          address: "Konya",
          userId: (req as any).user.id,
          productId: (cartitem as any).product.id
        });
      });
      return Order.bulkCreate(orders);
    })
    .then((orders: any) => {
      CartItem.destroy({
        where: {
          cartId: fetchedCart.id
        }
      });
    })
    .then((affectedRows: number) => {
      res.redirect("/user/cart");
    })
    .catch((err: Error) => {
      throw err;
    });
};
export const removeAllFromCart: RequestHandler = (req, res, next) => {
  const id = req.body.id;
  (req as any).user
    .getCart()
    .then((cart: CartInterface) => {
      return CartItem.findAll({
        where: {
          productId: id,
          cartId: cart.id
        }
      });
    })
    .then((cartitems: CartItemInterface[]) => {
      if (cartitems.length > 0) {
        return cartitems[0].destroy();
      } else {
        throw new Error("No such product to delete from the cart");
      }
    })
    .then(() => {
      res.redirect("/user/cart");
    })
    .catch((err: Error) => {
      throw err;
    });
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
