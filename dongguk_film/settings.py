"""
Django settings for dongguk_film project.

Generated by 'django-admin startproject' using Django 4.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path
import os, json
from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
secrets = os.path.join(BASE_DIR, "secrets.json")

with open(secrets) as f:
    secrets = json.loads(f.read())


def get_secret(setting):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)


SECRET_KEY = get_secret("SECRET_KEY")

DISCORD_TOKEN = get_secret("DISCORD_TOKEN")

DISCORD_MGT_WEBHOOK_URL = get_secret("DISCORD_MGT_WEBHOOK_URL")

DISCORD_DEV_WEBHOOK_URL = get_secret("DISCORD_DEV_WEBHOOK_URL")

NCP_ACCESS_KEY_ID = get_secret("NCP_ACCESS_KEY_ID")

NCP_SECRET_KEY = get_secret("NCP_SECRET_KEY")

NCP_SENS_SMS_SERVICE_ID = get_secret("NCP_SENS_SMS_SERVICE_ID")

MGT_PHONE = get_secret("MGT_PHONE")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["dongguk.film", "www.dongguk.film"]


# Security

SECURE_SSL_REDIRECT = True

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "rest_framework",
    "home",
    "facility",
    "users",
    "utility",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.kakao",
    "allauth.socialaccount.providers.naver",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "dongguk_film.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "dongguk_film" / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "dongguk_film.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = "ko-kr"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = "static/"

STATICFILES_DIRS = [BASE_DIR / "dongguk_film" / "static"]

STATIC_ROOT = os.path.join(BASE_DIR, "static_root")

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom User model

AUTH_USER_MODEL = "users.CustomUser"

# REST Framework

REST_FRAMEWORK = {
    # "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    # "DEFAULT_PARSER_CLASSES": [
    #     "rest_framework.parsers.JSONParser",
    # ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

# Django-allauth

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

SITE_ID = 1

LOGIN_REDIRECT_URL = "/"

LOGOUT_REDIRECT_URL = "/"

SESSION_COOKIE_AGE = 3600

SESSION_EXPIRE_AT_BROWSER_CLOSE = True

SESSION_SAVE_EVERY_REQUEST = True

SOCIALACCOUNT_FORMS = {
    "signup": "users.forms.SocialSignupForm",
}

SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "PROCESS": "login",
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "offline",
            "prompt": "select_account",
        },
    },
    "kakao": {
        "AUTH_PARAMS": {
            "prompt": "login",
        },
    },
    "naver": {
        "AUTH_PARAMS": {
            "auth_type": "reauthenticate",
        },
    },
}

SOCIALACCOUNT_AUTO_SIGNUP = False

SOCIALACCOUNT_EMAIL_REQUIRED = True

SOCIALACCOUNT_LOGIN_ON_GET = True

ACCOUNT_USERNAME_REQUIRED = False

ACCOUNT_EMAIL_REQUIRED = True

ACCOUNT_AUTHENTICATION_METHOD = "email"

# Email

EMAIL_HOST = "smtp.gmail.com"

EMAIL_PORT = "587"

EMAIL_HOST_USER = get_secret("EMAIL_HOST_USER")

EMAIL_HOST_PASSWORD = get_secret("EMAIL_HOST_PASSWORD")

EMAIL_USE_TLS = True

DEFAULT_FROM_EMAIL = get_secret("DEFAULT_FROM_EMAIL")
