import json
from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework import generics
from .models import User, Invoice, Item
from .serializers import UserSerializer, InvoiceSerializer, ItemSerializer

# users = [
#     {
#         "user_id": 1,
#         "username": "user1",
#         "email": "user1@example.com",
#         "password": "password123"
#     },
#     {
#         "user_id": 2,
#         "username": "user2",
#         "email": "user2@example.com",
#         "password": "password456"
#     },
#     {
#         "user_id": 3,
#         "username": "user3",
#         "email": "user3@example.com",
#         "password": "password789"
#     }
# ]
# invoices = [
#     {
#         "invoice_id": 1,
#         "client_name": "Client A",
#         "date": "2023-01-01"
#     },
#     {
#         "invoice_id": 2,
#         "client_name": "Client B",
#         "date": "2023-02-01"
#     },
#     {
#         "invoice_id": 3,
#         "client_name": "Client C",
#         "date": "2023-03-01"
#     }
# ]
# items = [
#     {
#         "invoice_id": 1,
#         "description": "Item 1",
#         "rate": 10,
#         "quantity": 5
#     },
#     {
#         "invoice_id": 1,
#         "description": "Item 2",
#         "rate": 15,
#         "quantity": 3
#     },
#     {
#         "invoice_id": 2,
#         "description": "Item 3",
#         "rate": 12,
#         "quantity": 4
#     },
#     {
#         "invoice_id": 3,
#         "description": "Item 4",
#         "rate": 8,
#         "quantity": 7
#     }
# ]


class SignUpView(generics.ListAPIView):
    def post(self, request):
        signUpDataReceived = request.data
        user_id = len(users) + 1
        signUpDataReceived["user_id"] = user_id
        users.append(signUpDataReceived)
        return JsonResponse({"status": 201})


class SignInView(generics.ListAPIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = next(
            (u for u in users if u["email"] == email and u["password"] == password), None)
        if user:
            username = user["username"]
            responseData = {"username": username, "status": 200}
            return JsonResponse(responseData)
        return HttpResponseBadRequest()


class InvoiceListView(generics.ListAPIView):
    def get(self, request):
        invoices_with_items = {}

        for invoice in invoices:
            invoice_id = invoice["invoice_id"]
            related_items = [
                item for item in items if item["invoice_id"] == invoice_id]
            invoice["items"] = related_items
            invoices_with_items[invoice_id] = invoice

        associated_data = list(invoices_with_items.values())

        return JsonResponse(associated_data, safe=False)


class InvoiceCreateView(generics.ListAPIView):
    def post(self, request):
        invoiceDataReceived = request.data
        invoice_id = len(invoices) + 1
        invoiceDataReceived["invoice_id"] = invoice_id
        invoices.append(invoiceDataReceived)
        return JsonResponse({"status": 201})


class InvoiceDetailView(generics.ListAPIView):
    def get(self, request, invoice_id):
        invoice = next(
            (i for i in invoices if i["invoice_id"] == int(invoice_id)), None)
        if invoice:
            related_items = [
                item for item in items if item["invoice_id"] == invoice_id]
            invoice["items"] = related_items
            return JsonResponse(invoice)
        return HttpResponseBadRequest(status=404)


class InvoiceItemCreateView(generics.ListAPIView):
    def post(self, request, invoice_id):
        # add invoice_id to the request body and save it in the items list
        data = request.data
        data["invoice_id"] = int(invoice_id)
        items.append(data)
        return JsonResponse({"status":201})