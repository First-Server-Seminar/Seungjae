## **User**

|id(PK)|name|email|password|salt|
|-|-|-|-|-|
|1|승재|oh980225@.com|12345|12345|

## **Post**

|id(PK)|author(FK->User.id)|title|contents|createdAt|updatedAt|
|-|-|-|-|-|-|
|1|1|게시글1번|게시글 1번입니다!|2020.11.09|2020.11.09|

## **Like**

|id(PK)|userId(FK->User.id)|postId(FK->Post.id)|
|-|-|-|
|1|1|1|

