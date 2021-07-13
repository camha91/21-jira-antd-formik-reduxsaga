import { baseService } from "./baseService";

export class CommentService extends baseService {
    constructor() {
        super();
    }

    insertComment = (commentObj) => {
        return this.post(`Comment/insertComment`, commentObj);
    };
}

export const commentService = new CommentService();
