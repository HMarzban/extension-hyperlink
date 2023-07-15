"use strict";
(() => {
var exports = {};
exports.id = 4;
exports.ids = [4];
exports.modules = {

/***/ 2813:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "url-metadata"
const external_url_metadata_namespaceObject = require("url-metadata");
var external_url_metadata_default = /*#__PURE__*/__webpack_require__.n(external_url_metadata_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/metadata.ts

async function handler(req, res) {
    if (req.method === "POST") {
        const { url } = req.body;
        if (!url) return res.status(400).json({
            message: "URL is required"
        });
        try {
            const metadata = await external_url_metadata_default()(url);
            return res.status(200).json(metadata);
        } catch (error) {
            // We need to check that error is an instance of Error before accessing `message`
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message
                });
            }
            // If it's not an Error instance or doesn't have a message, we can return a generic error message
            return res.status(500).json({
                message: "An unknown error occurred."
            });
        }
    } else {
        // If not a POST request
        return res.status(405).json({
            message: "Method not allowed"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2813));
module.exports = __webpack_exports__;

})();