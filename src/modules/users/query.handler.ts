import { IGetBusinessesUser, IGetProfileUser } from "./interface/res/user.interface";
import { EventPublisher, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetBusinessesUserQuery } from "./query/get-businesses-user.query";
import { GetProfileUserQuery } from "./query/get-profile-user.query";
import { UserRepository } from "./users.repository";


@QueryHandler(GetProfileUserQuery)
export class GetProfileUserQueryHandler implements IQueryHandler<GetProfileUserQuery> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(query: GetProfileUserQuery, resolve: (value?) => void): Promise<IGetProfileUser> {
        const getProfileDetail = this.publisher.mergeObjectContext(
            await this.userRepo.getUpdateProfile(query.request),
        );
        return getProfileDetail;
    }
}

@QueryHandler(GetBusinessesUserQuery)
export class GetBusinessesUserQueryHandler implements IQueryHandler<IGetBusinessesUser> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher,
    ) { }

    // @ts-ignore
    async execute(query: GetBusinessesUserQuery, resolve: (value?) => void): Promise<IGetBusinessesUser> {
        const getUserBusinesses = this.publisher.mergeObjectContext(
            await this.userRepo.getUserBusinesses(query.request),
        );
        return getUserBusinesses;
    }
}




