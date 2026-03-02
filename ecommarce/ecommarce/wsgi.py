"""
WSGI config for ecommarce project.
Auto-runs database migrations on cold start (needed for Vercel serverless).
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommarce.settings')

application = get_wsgi_application()

# ── Auto-migrate on cold start ──────────────────────────────────────────────
# On Vercel, db.sqlite3 lives in /tmp/ (fresh on each cold start).
# We use a flag file to avoid running migrate on every single request.
_MIGRATED_FLAG = '/tmp/.django_migrated'

if not os.path.exists(_MIGRATED_FLAG):
    try:
        from django.core.management import call_command
        call_command('migrate', '--run-syncdb', verbosity=0)
        with open(_MIGRATED_FLAG, 'w') as f:
            f.write('done')
        print("✅ Database migrations complete.")
    except Exception as e:
        print(f"⚠️  Migration warning: {e}")
