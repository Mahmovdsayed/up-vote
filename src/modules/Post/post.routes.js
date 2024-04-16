import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { multerMiddleWareHost } from "../../middlewares/multer.js";
import allowedExtensions from "../../utils/allowedExtensions.js";
import expressAsyncHandler from "express-async-handler";
import * as postController from "./post.controller.js";
const Postrouter = Router();
// add post
Postrouter.post(
  "/add",
  auth(),
  multerMiddleWareHost({
    extensions: allowedExtensions.image,
  }).array("image", 4),
  expressAsyncHandler(postController.addPost)
);
// like post
Postrouter.post(
  "/like/:postId",
  auth(),
  expressAsyncHandler(postController.likeOrUnLikePosts)
);
// get all likes
Postrouter.get(
  "/getlikes/:postId",
  expressAsyncHandler(postController.getAllLikeForProduct)
);
// update post
Postrouter.put(
  "/update/:postId",
  auth(),
  multerMiddleWareHost({ extensions: allowedExtensions.image }).single("image"),
  expressAsyncHandler(postController.updatePost)
);
// delete post
Postrouter.delete(
  "/delete/:postId",
  auth(),
  expressAsyncHandler(postController.deletePost)
);
// get all posts
Postrouter.get("/allPosts", auth(['user','admin']), expressAsyncHandler(postController.getAllPosts));

export default Postrouter;
