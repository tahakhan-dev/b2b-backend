import { BusinessTypeCategoryEntity } from "src/modules/category/entities/business-type-category.entity";
import { UserBusinessesEntity } from "src/modules/users/entities/user-businesses.entity";
import { UserForgetPasswordCodeEntity } from "src/modules/users/entities/user-forgetpassword-verfication.entity";
import { UserVerificationCodeEntity } from "src/modules/users/entities/user-verfication-code.entity"
import { UserEntity } from "src/modules/users/entities/user.entity";

// database entities
const entitiesList = [
    // use module
    UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity, UserBusinessesEntity,

    // category module
    BusinessTypeCategoryEntity
];


export { entitiesList };