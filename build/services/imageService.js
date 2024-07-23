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
exports.BouquetImageService = void 0;
const imageRepositories_1 = require("../repositories/imageRepositories");
const DateUtils_1 = require("../shared/utils/DateUtils");
class BouquetImageService {
    static addImage(bouquetId, imageUrl, createdBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = {
                bouquet_id: bouquetId,
                image_url: imageUrl,
                created_at: DateUtils_1.DateUtils.formatDate(new Date()),
                updated_at: DateUtils_1.DateUtils.formatDate(new Date()),
                created_by: createdBy,
                updated_by: createdBy,
            };
            const imageId = yield imageRepositories_1.BouquetImageRepository.create(image);
            image.id = imageId;
            return image;
        });
    }
    static getImagesByBouquetId(bouquetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield imageRepositories_1.BouquetImageRepository.findByBouquetId(bouquetId);
        });
    }
}
exports.BouquetImageService = BouquetImageService;
