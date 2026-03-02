"""
WSGI config for ecommarce project (Vercel production).
Keep this file as simple as possible — no startup code that can crash the function.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommarce.settings')

application = get_wsgi_application()
