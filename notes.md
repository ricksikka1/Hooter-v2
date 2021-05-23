REST API, User Auth, Unit Testing, Serialization, React hooks

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

14) Errors in pure JS are a pain, going to use React

15) Users functionality baked into django (foreign key ref in our tweets model)

16) Django super user so that the hoots that exist tie on to this first user. 

17) Use django admin for internal use, login and alter admin.py to import ur Hoot model to see all the objects, can add search fields etc.

18) Pure django is a pain for this giant view, time to use Django REST framework

19) rest framework has serializer which takes care of the forms stuff from pure django, very clean

20) rest framework decorator has api_view which can restrict access to views to only certain types of requests like POST... same with permissions decorater for User Auth

21) Likes are many to many field (filled with Users) .... thank you ECE356

22) React will handle our liked/unliked state stuff

22) Two types of serializers, create and readonly!

23) @property decorater is pythonic Getter & Setters

24) django has a built in test suite (tests.py) https://docs.djangoproject.com/en/3.2/topics/testing/ but this is for basic django

25) django REST testing framework here https://www.django-rest-framework.org/api-guide/testing/ to test my API

26) Cors, allow any site to have access to my api 

------------------------------------------------ REACT TIME -------------------------------------------------------------------

1) React hooks are special functions that let us "hook into" React features

2) useEffect Hook allows us to do something as a side effect, after rendor is done it will check if anythings changed

3) useState allows us to have state variables in our components (functions) 

4) Use props to pass data between components (parent to child), this reallllly helps for dynamic rendering

5) Functional components are much easier to use then stringing things together