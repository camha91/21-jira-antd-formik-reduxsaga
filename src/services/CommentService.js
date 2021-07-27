import { baseService } from "./baseService";

export class CommentService extends baseService {
    constructor() {
        super();
    }

    insertComment = (commentObj) => {
        return this.post(`Comment/insertComment`, commentObj);
    };

    updateComment = (commentUpdate) => {
        return this.put(
            `Comment/updateComment?id=${commentUpdate.id}&contentComment=${commentUpdate.contentComment}`
        );
    };

    deleteComment = (id) => {
        return this.delete(`Comment/deleteComment?idComment=${id}`);
    };
}

export const commentService = new CommentService();
