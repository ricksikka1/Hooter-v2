# REST API Calls

## Hoots

### Create a Hoot

* URL: /api/hoots/create/
* METHOD: `POST`
* Data Params: {content: <_content_>}
* Success Response:
  * Content: {'user': <_user_>, 'id': <_id_>, 'likes': <_likes_>, 'timestamp': <_timestamp_>}
  * Code: 201
* Error Response:
  * Content: {}
  * Code: 400

### Delete a Hoot

* URL: /api/hoots/delete/:id
* METHOD: `DELETE`
* Data Params: {hoot_id: <_hoot_id_>}
* Success Response:
  * Content: {'message': 'Hoot Removed'}
  * Code: 200
* Error Response:
  * Content: {'message': 'You cannot remove this hoot'}
  * Code: 401

### Return Personal Feed

* URL: /api/hoots/feed/
* METHOD: `GET`
* Data Params: {content: <_content_>}
* Success Response:
  * Content: {'user': <_user_>, 'id': <_id_>, 'likes': <_likes_>, 'timestamp': <_timestamp_>}
  * Code: 201
* Error Response:
  * Content: {}
  * Code: 400
