export interface IUserSearchOptionsByUserNameOrEmail {
    where: [
        {
            email?: string;
            userName?: string;
        },
        {
            email?: string;
            userName?: string;
        }
    ];
}
