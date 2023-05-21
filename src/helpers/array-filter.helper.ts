import { Injectable } from "@nestjs/common";

@Injectable()
export class ArrayFilterHelper {
    public filterArray<T>(result: T[], args: string[]): T[] {
        // Filter the array based on user-defined arguments
        return result.map((item) => {
            const filteredItem: Partial<T> = {};
            Object.keys(item).forEach((key) => {
                if (!args.includes(key)) {
                    filteredItem[key] = item[key];
                }
            });
            return filteredItem as T;
        });
    }
}
