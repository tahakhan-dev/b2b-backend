import {  UserEntity } from "src/modules/users/entities/user.entity";
import {UserVerificationCodeEntity} from "src/modules/users/entities/user-verfication-code.entity"

// database entities
const entitiesList = [
    UserEntity,UserVerificationCodeEntity
];


export { entitiesList };