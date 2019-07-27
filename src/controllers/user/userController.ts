import { RequestHandler } from "express";
import { Product, ProductInterface } from "../../models/product";
import { CartItem, CartItemInterface } from "../../models/cartitem";
import { CartInterface } from "../../models/cart";
import { Order, OrderInterface } from "../../models/order";
import { OrderItemInterface } from "../../models/orderitem";


export const getProducts: RequestHandler = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("user/products", {
        pageTitle: "Products",
        prods: products,
        active: "products"
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const getShop: RequestHandler = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("user/shop", {
        pageTitle: "Shop",
        prods: products,
        active: "shop"
      });
    })
    .catch((err) => {
      console.error(err);
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
    .then(
      (product) => {
        if (product) {
          res.render("user/view-product", {
            pageTitle: "Product Detail",
            active: "products",
            product: product
          });
        } else {
          res.redirect("/notfound");
        }
      }
    )
    .catch((err) => {
      console.error(err);
    });

};
export const getCart: RequestHandler = (req, res, next) => {
  let items: any;

  (req as any).user.getCart()
    .then(
      (cart: CartInterface) => {
        return (cart as any).getProducts();
      }
    )
    .then(
      (products: Array<ProductInterface>) => {
        items = products;
        let price = 0;
        items.forEach((prod: ProductInterface) => {
          price += Number(prod.price) * Number((prod as any).cartitem.quantity);
        });
        return price;
      }
    )
    .then(
      (price: number) => {
        res.render("user/cart", {
          pageTitle: "Cart",
          active: "cart",
          entries: items,
          price: price
        });
      }
    )
    .catch();

};

export const addToCart: RequestHandler = (req, res, next) => {

  let fetchedProduct: ProductInterface;
  let fetchedCart: CartInterface;
  Product.findByPk(req.body.id)
    .then(
      product => {
        if (product) {
          fetchedProduct = product;
          return (req as any).user.getCart();
        } else {
          throw new Error("No such product in product table to be added to the cart:" + req.body.id);
        }
      }
    )
    .then(cart => {
      fetchedCart = cart;
      return CartItem.findAll({
        where: {
          productId: fetchedProduct.id,
          cartId: cart.id
        }
      });
    })
    .then(
      cartitems => {
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
      }
    )
    .then(
      cartitem =>{
        res.redirect("/user/cart");
      }
    )
    .catch(
      err => {
        console.error(err);
      }
    );
};
export const removeFromCart: RequestHandler = (req, res, next) => {
  const id = req.body.id;
  (req as any).user.getCart()
  .then(
    (cart : CartInterface) => {
      return CartItem.findAll({
        where: {
          productId: id,
          cartId: cart.id
        }
      });
    }
  )
  .then(
    (cartitems : CartItemInterface[]) => {
      if(cartitems.length > 0){
        if(cartitems[0].quantity > 1){
          cartitems[0].quantity--;
          return cartitems[0].save();
        }else{
          return cartitems[0].destroy();
        }
      }else {
        throw new Error("No such product to delete from the cart");
      }
    }
  )
  .then(
    ()=>{
      res.redirect("/user/cart");
    }
  )
  .catch(
    (err : Error)=>{
      console.log(err);
  });
};
export const addOrder: RequestHandler = (req, res, next) => {

  let fetchedCart : CartInterface;
  let createdOrder: OrderInterface;

  Order.create({
    address: "Konya",
    userId: (req as any).user.id,
  })
  .then(
    (order : OrderInterface)=>{
      createdOrder = order;
      return (req as any).user.getCart();
    }
  )
  .then((cart : CartInterface)=>{
    if(cart){
      fetchedCart = cart;
      return CartItem.findAll({
        where: {
          cartId: cart.id
        }
      });
    }else{
      throw new Error("No cart of the user!!")
    }
  })
  
  .then(((cartitems : CartItemInterface[]) =>{
    return (createdOrder as any).setCartitems(cartitems);
  }))
  .then((orderitem : OrderItemInterface)=>{
    return CartItem.destroy({
      where: {
        cartId: fetchedCart.id
      }
    });
  })
  .then((affectedRows : number)=>{
    res.redirect("/user/cart");
  })
  .catch((err : Error)=>{
    console.log(err);
  });
}
export const removeAllFromCart: RequestHandler = (req, res, next) => {
  const id = req.body.id;
  (req as any).user.getCart()
  .then(
    (cart : CartInterface) => {
      return CartItem.findAll({
        where: {
          productId: id,
          cartId: cart.id
        }
      });
    }
  )
  .then(
    (cartitems : CartItemInterface[]) => {
      if(cartitems.length > 0){
          return cartitems[0].destroy();
      }else {
        throw new Error("No such product to delete from the cart");
      }
    }
  )
  .then(()=>{
    res.redirect("/user/cart");
  })
  .catch(
    (err : Error)=>{
      console.log(err);
  });
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
