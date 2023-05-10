import { EventPublisher, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProfileUserQuery } from "./query/get-profile-user.query";
import { UserRepository } from "./users.repository";

import { IGetProfileUser } from "./interface/res/user.interface";


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




