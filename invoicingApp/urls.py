from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import SignInView, SignUpView, InvoiceListView, InvoiceCreateView, InvoiceDetailView, InvoiceItemCreateView

urlpatterns = [
    # Define URL patterns for your views here
    path('user/login/', csrf_exempt(SignInView.as_view()), name='signin'),
    path('user/signup/', csrf_exempt(SignUpView.as_view()), name='signup'),
    path('invoices/', InvoiceListView.as_view(), name='invoices'),
    path('invoices/new/', InvoiceCreateView.as_view(), name='new_invoice'),
    path('invoices/<int:invoice_id>/', InvoiceDetailView.as_view(), name='invoice_detail'),
    path('invoices/<int:invoice_id>/items/', InvoiceItemCreateView.as_view(), name='invoice_detail'),
]