const {
  User,
  Post,
  Like
} = require('../models');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

module.exports = {
  // body: title, contents, userId
  createPost: async (req, res) => {
    const {
      title,
      contents,
      userId
    } = req.body;
    // body값 테스트 필요
    try {
      // const post = await Post.create({
      //   title,
      //   contents,
      //   UserId: userId
      // }); 이것을 아래처럼 스페셜메서드를 사용하여 구현가능!

      const user = await User.findOne({id: userId});
      console.log(user);
      const post = await Post.create({title,contents});

      await user.addPost(post); // post에 해당 user에 대한 외래키 추가

      return res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.CREATE_POST_SUCCESS, post));
    } catch (err) {
      console.error(err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_POST_FAIL));
    }
  },
  readPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{ // join -> 관계가 있는 테이블들끼리 합쳐주는 것!
          model: User, // 작성자
          attributes: ['email', 'userName']
        }, {
          model: User, // 좋아요 누른 사람
          as: 'Liker',
          attributes: { exclude: ['password', 'salt'] } // password, salt 제외한 정보를 가져온다!
        }]
      });
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST_ALL_SUCCESS, posts));
    } catch(err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.READ_POST_ALL_FAIL));
    }
  },
  createLike: async (req, res) => {
    const PostId = Number.parseInt(req.params.postId);
    const UserId = req.body.userId;

    // 값 제대로 들어왔는지 체크 필요!

    try {
      const like = await Like.create({UserId, PostId});
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_LIKE_SUCCESS, like));
    } catch(err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_LIKE_FAIL));
    }
  },
  deleteLike: async (req, res) => {
    const PostId = req.params.postId;
    const UserId = req.body.userId;

    if(!PostId || !UserId) {
      console.log('필요한 값이 없습니다!');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    try {
      const user = await User.findOne({
        where: {
          id: UserId
        }
      });

      if(!user) {
        console.log("존재하지 않는 아이디 입니다.");
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
      }
  
      const post = await Post.findOne({
        where: {
          id: PostId 
        }
      })

      if(!post) {
        console.log("존재하지 않는 게시글 입니다.");
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
      }

      const like = await Like.findOne({
        where: {
          UserId,
          PostId
        }
      });

      if(!like) {
        console.log("존재하지 않는 좋아요 입니다.");
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_Like));
      }

      await Like.destroy({
        where: {
          UserId,
          PostId
        }
      });

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.DELETE_LIKE_SUCCESS, like));
    } catch(err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DELETE_LIKE_FAIL));
    }
  }
}