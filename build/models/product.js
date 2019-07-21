"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var path_1 = require("../util/path");
var fileLocation = path.join(path_1.baseDirectory, "data", "products.json");
var getProductsFromFile = function (cb) {
    fs.readFile(fileLocation, function (err, data) {
        if (err) {
            cb([]);
        }
        else {
            cb(JSON.parse(data.toString()));
        }
    });
};
var Product = /** @class */ (function () {
    function Product(title, price, description, imageUrl) {
        var arrayBuffer = new ArrayBuffer(8);
        var numberArray = new Float64Array(arrayBuffer);
        numberArray[0] = Math.random();
        var buffer = Buffer.from(arrayBuffer);
        this.id = buffer.toString('base64');
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    Product.prototype.save = function () {
        var _this = this;
        getProductsFromFile(function (products) {
            products.push(_this);
            fs.writeFile(fileLocation, JSON.stringify(products), function (err) {
                console.log(err);
            });
        });
    };
    Product.fetchAll = function (cb) {
        getProductsFromFile(cb);
    };
    return Product;
}());
exports.Product = Product;
;
