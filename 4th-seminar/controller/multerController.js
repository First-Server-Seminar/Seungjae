const {
  Post
} = require('../models');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

module.exports = {
  uploadImgOnThePost: async (req, res) => {
    const image = req.file.location; // 이것으로 파일의 주소를 클라이언트에게 넘겨준다!
    const {
      id
    } = req.params;

    try {
      await Post.update({
        postImageUrl: image
      }, {
        where: {
          id
        }
      });

      console.log(req.file);
      console.log(req.body);

      const uploadedImg = {
        imageUrl: image,
        file: req.file,
        body: req.body
      }

      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.UPDATE_POST_SUCCESS, uploadedImg));
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_POST_FAIL));
    }


  },
  uploadImgs: async (req, res) => {
    const imageUrls = req.files.map(file => file.location);

    console.log(req.files);
    console.log(req.body);

    const uploadedImgs = {
      imageUrls: imageUrls,
      file: req.files,
      body: req.body
    }

    return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, 'IMAGES UPLOAD SUCCESS', uploadedImgs));
  }
};