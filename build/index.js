"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
var PORT = 3001;
app.get('/api/ping', function (_req, res) {
    console.log('someone pinged here');
    res.send('pong');
});
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
/// muuta. Async-Await. Jos funtio palauttaa promisen niin tällaisen voi pysäyttää awaitillä, eli silloin odotetaan kunnes promis on resolved. Muuten jatkaisi eteenpäin. 
