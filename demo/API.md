# REST API Calls (Django Rest Framework)

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
* Success Response:
  * Content: {'user': <_user_>, 'id': <_id_>, 'likes': <_likes_>, 'timestamp': <_timestamp_>}
  * Code: 201
* Error Response:
  * Content: {}
  * Code: 400

### Like/Unlike/ReHoot

* URL: /api/hoots/action/
* METHOD: `POST`
* Data Params: {id: <_id_>, action: <_action_>}
* Success Response:
  * Content: {'user': <_user_>, 'id': <_id_>, 'likes': <_likes_>, 'timestamp': <_timestamp_>}
  * Code: 200/201
* Error Response:
  * Content: {}
  * Code: 400

### Hoot Detail View

* URL: /api/hoots/:id
* METHOD: `GET`
* Success Response:
  * Content: {'user': <_user_>, 'id': <_id_>, 'likes': <_likes_>, 'timestamp': <_timestamp_>}
  * Code: 200
* Error Response:
  * Content: {}
  * Code: 404
  
## Profile

### Follow a User

* URL: /api/profiles/:username/follow/
* METHOD: `POST`
* Data Params: {action: <_action_>} (Follow / Unfollow)
* Success Response:
  * Content: {'username': <_username_>, 'first_name': <_first_name_>, 'last_name': <_last_name_>, 'id': <_id_>, 'location': <_location_>, 'bio': <_bio_>, 'following_count': <_following_count_>, 'follower_count': <_follower_count_>, 'is_following': <_is_following_>}
  * Code: 200
* Error Response:
  * Content: {"detail": "Profile not found"}
  * Code: 404

### Get Profile Detail

* URL: /api/profiles/:username
* METHOD: `GET`
* Success Response:
  * Content: {'username': <_username_>, 'first_name': <_first_name_>, 'last_name': <_last_name_>, 'id': <_id_>, 'location': <_location_>, 'bio': <_bio_>, 'following_count': <_following_count_>, 'follower_count': <_follower_count_>, 'is_following': <_is_following_>}
  * Code: 200
* Error Response:
  * Content: {"detail": "Profile not found"}
  * Code: 404
