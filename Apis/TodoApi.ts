import { APIRequestContext } from "@playwright/test";
import User from "../Models/User";

export default class TodoApi {


    private request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async todoFn(user: User) {
        return await this.request.post('/api/v1/tasks', {
            data: {

                isCompleted: false,
                item: "playwright",

            },
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`,
            },
        });
    }
}