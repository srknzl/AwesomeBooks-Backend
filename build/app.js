"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var adminRoutes = __importStar(require("./routes/admin"));
var userRoutes = __importStar(require("./routes/user"));
var notFoundController = __importStar(require("./controllers/errors"));
var welcomeController = __importStar(require("./controllers/welcome"));
var app = express_1.default();
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use('/admin', adminRoutes.router);
app.use('/user', userRoutes.router);
app.get('/', welcomeController.getWelcomePage);
app.use(notFoundController.getWelcomeNotFound);
app.listen(3001, 'localhost');
