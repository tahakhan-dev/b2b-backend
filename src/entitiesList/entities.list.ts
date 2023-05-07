import { UserEntity } from "src/modules/users/entities/user.entity";
import { UserVerificationCodeEntity } from "src/modules/users/entities/user-verfication-code.entity"
import { UserForgetPasswordCodeEntity } from "src/modules/users/entities/user-forgetpassword-verfication.entity";

// database entities
const entitiesList = [
    UserEntity, UserVerificationCodeEntity, UserForgetPasswordCodeEntity
];


export { entitiesList };