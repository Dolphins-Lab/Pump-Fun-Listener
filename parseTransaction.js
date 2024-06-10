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
const getParsedTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myHeaders = new Headers();
        myHeaders.append("x-api-key", "pJvscDs57jZbepGR");
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch("https://api.shyft.to/sol/v1/transaction/parsed?network=mainnet-beta&txn_signature=58VwAZsnHGz5Dyisi3vGUUMMWKHzVndHao3f6BSU7SaD76CD5vfipsnZDztZA9kjwNjwS6HQFRMsXAwBJUKR9W8Z", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    }
    catch (error) {
        console.log(error);
    }
});
getParsedTransaction();
