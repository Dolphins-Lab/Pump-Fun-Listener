"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const web3_js_2 = require("@solana/web3.js");
const parseTransaction_1 = require("./parseTransaction");
const startMonitoringPumpFun = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // PUMP FUN ADDRESS
        const publicKey = new web3_js_1.PublicKey("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P");
        // Use default RPC but shyft or helius or other provider is recommended
        const connection = new web3_js_2.Connection("https://api.mainnet-beta.solana.com", {
            wsEndpoint: "wss://api.mainnet-beta.solana.com",
        });
        connection.onLogs(publicKey, (logs, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (logs.logs &&
                // Look for this instruction in the logs
                logs.logs.some((log) => log.includes("Program log: Instruction: InitializeMint2"))) {
                console.log(logs.signature, " Received Signature");
                // console.log(logs, "Logs");
                console.log(context, "Context");
                const signature = logs.signature;
                if (signature) {
                    const response = yield (0, parseTransaction_1.getParsedTransaction)(String(signature));
                    if (response !== null) {
                        const { data, poolInfoAddress } = response;
                        console.log(data, "Parsed Transaction Details");
                        console.log("Pool Info Address:", poolInfoAddress);
                    }
                }
            }
        }), "confirmed");
    }
    catch (error) {
        console.log(error);
    }
});
startMonitoringPumpFun();
