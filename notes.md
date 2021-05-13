REST API, User Auth, 

1) Creating Django model. This is the abstracted level from the sql db. Django takes care a lot of this for us

2) Dynamic routing. ok so this is on the fly changing views based on url paths. Great example here https://docs.djangoproject.com/en/3.2/topics/http/urls/

3) *args is an unpacked list and **kwargs is an unpacked dict. kwargs uses key words infront where as args do not. https://realpython.com/python-kwargs-and-args/

4) Try except, we raise an error here if we do a search on /tweets/tweet_id=(something that isn't in our db yet). Raise 404 here

5) Return REST API View aka JSON so that it can be consumed by JavaScript or w.e else

6) Views, they take web requests and return web responses

7) Use base bootstrap template and have other templates inherit from base 

8) Meta class within django for added db permissions when creating model forms

9) Forms in django take a look here https://docs.djangoproject.com/en/3.2/topics/forms/ check the view section associated with creating this

10) Use forms in django to validate content (clean content) and to render the actual form

11) Django HAS SECURITY FEATURE BUILT IN FOR safe url redirect (is_safe_url from settings)

12) AJAX requests help update pages async, so we can update without reloading the page

13) Serialize model for convenience (Easier for javascript to take)

14) Errors in pure JS is a pain, going to use React

15) Users functionality baked into django (foreign key ref in our tweets model)

16) Django super user so that the hoots that exist tie on to this first user. 

17) Use django admin for internal use, login and alter admin.py to import ur Hoot model to see all the objects, can add search fields etc.

18) Pure django is a pain for this giant view, time to use Django REST framework

19) rest framework has serializer which takes care of the forms stuff from pure django, very clean

20) rest framework decorator has api_view which can restrict access to views to only certain types of requests like POST... same with permissions decorater for User Auth