import { RequestHandler } from "express";
import { Product, ProductInterface } from "../../models/product";
import { CartItem } from "../../models/cartitem";


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
  let items;

  req.user.getCart()
    .then(
      cart => {
        return cart.getProducts();
      }
    )
    .then(
      (products: Array<ProductInterface>) => {
        items = products;
        let price = 0;
        items.forEach(prod => {
          price += Number(prod.price) * Number(prod.cartitem.quantity);
        });
        return price;
      }
    )
    .then(
      (price) => {
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
  let fetchedProduct;
  let fetchedCart;

  Product.findByPk(req.body.id)
    .then(
      product => {
        if (product) {
          fetchedProduct = product;
        } else {
          console.log("No such product to add to cart:", req.body.id);
        }
      }
    ).catch(
      err => {
        console.error(err);
      }
    )


  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();

    })
    .then((products) => {
      return products.filter(prod => prod.id === fetchedProduct.id);
    })
    .then(
      prods => {
        if (prods[0]) {
          CartItem.findAll({
            where: {
              productId: fetchedProduct.id
            }
          }).then(
            cartitems => {
              if (cartitems[0]) {
                cartitems[0].quantity++;
                cartitems[0].save();
                res.redirect("/user/cart");
              } else {
                console.error("No such product to add to cart");
                res.redirect("/user/cart");
              }
            }
          )
        } else {
          CartItem.create({
            quantity: 1,
            productId: fetchedProduct.id,
            cartId: fetchedCart.id
          }
          )
            .then(
              cartitem => {
                res.redirect("/user/cart");
              }
            )
            .catch(
              err => {
                console.error(err);
              }
            );
        }
      }
    )
    .catch(err => {
      console.error(err);
    });
};
export const removeFromCart: RequestHandler = (req, res, next) => {
  const id = req.body.id;

  res.redirect("/user/cart");
};
export const removeAllFromCart: RequestHandler = (req, res, next) => {
  const id = req.body.id;

  res.redirect("/user/cart");
};
export const getNotFound: RequestHandler = (req, res, next) => {
  res.render("errors/user-not-found", {
    pageTitle: "Not found",
    active: ""
  });
};
