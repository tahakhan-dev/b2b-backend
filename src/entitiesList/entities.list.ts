import { BusinessTypeCategoryEntity } from "src/modules/category/entities/business-type-category.entity";
import { UserForgetPasswordCodeEntity } from "src/modules/users/entities/user-forgetpassword-verfication.entity";
import { UserVerificationCodeEntity } from "src/modules/users/entities/user-verfication-code.entity"
import { UserEntity } from "src/modules/users/entities/user.entity";

// database entities
const entitiesList = [
    UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity, BusinessTypeCategoryEntity
];


export { entitiesList };