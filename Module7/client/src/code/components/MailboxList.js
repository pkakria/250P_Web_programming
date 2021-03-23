"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Chip_1 = __importDefault(require("@material-ui/core/Chip"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var MailboxList = function (_a) {
    var state = _a.state;
    return (react_1.default.createElement(List_1.default, null, state.mailboxes.map(function (value) {
        return (react_1.default.createElement(Chip_1.default, { label: "" + value.name, onClick: function () { return state.setCurrentMailbox(value.path); }, style: { width: 128, marginBottom: 10 }, color: state.currentMailbox === value.path ? "secondary" : "primary" }));
    })));
};
exports.default = MailboxList;
//# sourceMappingURL=MailboxList.js.map