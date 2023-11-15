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
exports.generateLast12MonthsData = void 0;
// GENERATE LAST 12 MONTH ANALITYC
function generateLast12MonthsData(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const last12Months = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        for (let index = 11; index >= 0; index--) {
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - index * 28);
            const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28);
            const monthYear = endDate.toLocaleString('default', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            const count = yield model.countDocuments({
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            });
            last12Months.push({ month: monthYear, count });
        }
        return { last12Months };
    });
}
exports.generateLast12MonthsData = generateLast12MonthsData;
