from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from .models import Hoot

User = get_user_model()

# Create your tests here.
class HootTestCase(TestCase):
    '''
    Need to Put DB related items in here setUp
    '''
    def setUp(self):
        self.user = User.objects.create_user(username='abc', password='somepassword')
        self.user_B = User.objects.create_user(username='user2', password='somepassword') 
        Hoot.objects.create(content="My First Hoot", user=self.user)
        Hoot.objects.create(content="My Second Hoot", user=self.user)
        Hoot.objects.create(content="My Third Hoot", user=self.user_B)
        self.currentCount = Hoot.objects.all().count()

    '''
    Basic Django Test
    '''
    def test_hoot_created(self):
        hoot_obj = Hoot.objects.create(content="HootHoot", user=self.user)
        self.assertEqual(hoot_obj.id, 4)
        self.assertEqual(hoot_obj.user, self.user)

    '''
    Django Rest Testing
    '''
    def get_client(self):
        # Make all requests in the context of a logged in session.
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_hoot_list(self):
        client = self.get_client()
        response = client.get("/api/hoots/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_create_hoot(self):
        req_data = {"content": "This is my test hoot"}
        client = self.get_client()
        response = client.post("/api/hoots/create/", req_data)
        self.assertEqual(response.status_code, 201)
        res_data = response.json()
        new_hoot_id = res_data.get("id")
        self.assertEqual(self.currentCount + 1, new_hoot_id)
       
    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/hoots/action/", {"id": 1, "action": "like"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/api/hoots/action/", {"id": 2, "action": "like"})
        self.assertEqual(response.status_code, 200)
        response = client.post("/api/hoots/action/", {"id": 2, "action": "unlike"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 0)

    def test_action_rehoot(self):
        client = self.get_client()
        response = client.post("/api/hoots/action/", {"id": 2, "action": "rehoot"})
        self.assertEqual(response.status_code, 201)
        data = response.json()
        new_hoot_id = data.get("id")
        self.assertNotEqual(2, new_hoot_id)
        self.assertEqual(self.currentCount + 1, new_hoot_id)

    def test_detail_view(self):
        client = self.get_client()
        response = client.get("/api/hoots/1/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        _id = data.get("id")
        self.assertEqual(_id, 1)
    
    def test_delete(self):
        client = self.get_client()
        response = client.delete("/api/hoots/1/delete/")
        self.assertEqual(response.status_code, 200)
        response = client.delete("/api/hoots/1/delete/")
        self.assertEqual(response.status_code, 404)
        incorrect_owner_response = client.delete("/api/hoots/3/delete/")
        self.assertEqual(incorrect_owner_response.status_code, 401)

    
