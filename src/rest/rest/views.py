from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from datetime import datetime

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        try:
            todos = list(db.todos.find({}).sort('created_at', -1))
            for todo in todos:
                todo['_id'] = str(todo['_id'])

            return Response(todos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        try:
            todo_description = request.data.get('description', '')

            if not todo_description:
                return Response({'error': 'TODO description is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            db.todos.insert_one({'description': todo_description,'created_at': datetime.now()})

            return Response({'message': 'TODO item created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

