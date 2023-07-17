"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/metadata";
exports.ids = ["pages/api/metadata"];
exports.modules = {

/***/ "metadata-scraper":
/*!***********************************!*\
  !*** external "metadata-scraper" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("metadata-scraper");

/***/ }),

/***/ "(api)/./src/pages/api/metadata.ts":
/*!***********************************!*\
  !*** ./src/pages/api/metadata.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var metadata_scraper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! metadata-scraper */ \"metadata-scraper\");\n/* harmony import */ var metadata_scraper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(metadata_scraper__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        const { url } = req.body;\n        if (!url) return res.status(400).json({\n            message: \"URL is required\"\n        });\n        try {\n            const metadata = await metadata_scraper__WEBPACK_IMPORTED_MODULE_0___default()(url);\n            return res.status(200).json(metadata);\n        } catch (error) {\n            // We need to check that error is an instance of Error before accessing `message`\n            if (error instanceof Error) {\n                return res.status(500).json({\n                    message: error.message\n                });\n            }\n            // If it's not an Error instance or doesn't have a message, we can return a generic error message\n            return res.status(500).json({\n                message: \"An unknown error occurred.\"\n            });\n        }\n    } else {\n        // If not a POST request\n        return res.status(405).json({\n            message: \"Method not allowed\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL21ldGFkYXRhLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUUyQztBQVM1QixlQUFlQyxRQUM1QkMsR0FBbUIsRUFDbkJDLEdBQTBDO0lBRTFDLElBQUlELElBQUlFLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLE1BQU0sRUFBRUMsR0FBRyxFQUFFLEdBQUdILElBQUlJLElBQUk7UUFFeEIsSUFBSSxDQUFDRCxLQUFLLE9BQU9GLElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFrQjtRQUVuRSxJQUFJO1lBQ0YsTUFBTUMsV0FBVyxNQUFNVix1REFBV0EsQ0FBQ0s7WUFDbkMsT0FBT0YsSUFBSUksTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0U7UUFDOUIsRUFBRSxPQUFPQyxPQUFnQjtZQUN2QixpRkFBaUY7WUFDakYsSUFBSUEsaUJBQWlCQyxPQUFPO2dCQUMxQixPQUFPVCxJQUFJSSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO29CQUFFQyxTQUFTRSxNQUFNRixPQUFPO2dCQUFDO1lBQ3ZEO1lBRUEsaUdBQWlHO1lBQ2pHLE9BQU9OLElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBNkI7UUFDdEU7SUFDRixPQUFPO1FBQ0wsd0JBQXdCO1FBQ3hCLE9BQU9OLElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFxQjtJQUM5RDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGRvY3BsdXMvZGVtby8uL3NyYy9wYWdlcy9hcGkvbWV0YWRhdGEudHM/ZmRlMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IHVybE1ldGFkYXRhIGZyb20gXCJ1cmwtbWV0YWRhdGFcIjtcbmltcG9ydCBnZXRNZXRhRGF0YSBmcm9tIFwibWV0YWRhdGEtc2NyYXBlclwiO1xudHlwZSBEYXRhID0ge1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59O1xuXG50eXBlIEVycm9yUmVzcG9uc2UgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlPERhdGEgfCBFcnJvclJlc3BvbnNlPlxuKSB7XG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgIGNvbnN0IHsgdXJsIH0gPSByZXEuYm9keTtcblxuICAgIGlmICghdXJsKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIlVSTCBpcyByZXF1aXJlZFwiIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgZ2V0TWV0YURhdGEodXJsKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihtZXRhZGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgdGhhdCBlcnJvciBpcyBhbiBpbnN0YW5jZSBvZiBFcnJvciBiZWZvcmUgYWNjZXNzaW5nIGBtZXNzYWdlYFxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQncyBub3QgYW4gRXJyb3IgaW5zdGFuY2Ugb3IgZG9lc24ndCBoYXZlIGEgbWVzc2FnZSwgd2UgY2FuIHJldHVybiBhIGdlbmVyaWMgZXJyb3IgbWVzc2FnZVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJBbiB1bmtub3duIGVycm9yIG9jY3VycmVkLlwiIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJZiBub3QgYSBQT1NUIHJlcXVlc3RcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBtZXNzYWdlOiBcIk1ldGhvZCBub3QgYWxsb3dlZFwiIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiZ2V0TWV0YURhdGEiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwidXJsIiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwibWV0YWRhdGEiLCJlcnJvciIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/metadata.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/metadata.ts"));
module.exports = __webpack_exports__;

})();