# Hospital-Management-System
Django, tailwind, and Htmx commercial project


create venv

pip install django

django-admin startproject hms_project .

python manage.py runserver

python manage.py startapp core

add core to settings

Write your first view

core/views.py
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the core index.")


core/urls.py

from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
]


project/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("polls/", include("polls.urls")),
    path("admin/", admin.site.urls),
]

python manage.py runserver


install htmx 

pip install django-htmx

INSTALLED_APPS = [
    ...,
    "django_htmx",
    ...,
]

MIDDLEWARE = [
    ...,
    "django_htmx.middleware.HtmxMiddleware",
    ...,
]


create the template directory:
and create core/index.html
and edit the view


from django.shortcuts import render

from .models import Question


def index(request):
    return render(request, "core/index.html")





 {% load django_htmx %}
 <!doctype html>
 <html>
   <head>
     ...
     {% htmx_script %}
   </head>
   <body hx-headers='{"x-csrftoken": "{{ csrf_token }}"}'>
     ...
   </body>
 </html>



 example

# views.py
from django.http import JsonResponse

def simple_message(request):
    return JsonResponse({'message': 'Hello from the server!'})


# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('simple_message/', views.simple_message, name='simple_message'),
]


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTMX Test</title>
    <script src="https://unpkg.com/htmx.org@1.8.4"></script>
</head>
<body>
    <h1>HTMX Test</h1>

    <div id="response-message"></div>

    <!-- Button to trigger the HTMX request -->
    <button hx-get="{% url 'simple_message' %}" hx-target="#response-message" hx-swap="innerHTML">
        Get Server Message
    </button>

</body>
</html>


install vite for tailwind:

npm create vite@latest hms-frontend
cd hms-frontend


npm install tailwindcss @tailwindcss/vite


vite.config.ts

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

CSS
@import "tailwindcss";

npm run dev

<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>

edit vite app, delete unnecessary files


install alpine js

npm install alpinejs

src/main.js
import Alpine from 'alpinejs'
 
window.Alpine = Alpine
 
Alpine.start()


create the static folder

edite vite.config.js

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  // Entry points for Vite
  build: {
    // Output to Django's static directory
    outDir: '../static/dist',

    // Clean the output directory before build
    emptyOutDir: true,

    // Disable file name hashing for predictable names
    rollupOptions: {
      input: {
        main: './src/main.js',
        style: './src/style.css'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]'
      }
    },

    // Minify in production, but keep readable during development
    minify: 'esbuild',

    // Generate source maps for easier debugging
    sourcemap: true
  },

  // Configure the dev server (optional, for serving during development)
  server: {
    port: 3000,
    open: false
  }
  ,
   assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf']
})


"watch": "vite build --watch"


<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">From the blog</h2>
      <p class="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
    </div>
    <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <article class="flex max-w-xl flex-col items-start justify-between">
        <div class="flex items-center gap-x-4 text-xs">
          <time datetime="2020-03-16" class="text-gray-500">Mar 16, 2020</time>
          <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Marketing</a>
        </div>
        <div class="group relative grow">
          <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span class="absolute inset-0"></span>
              Boost your conversion rate
            </a>
          </h3>
          <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-10 rounded-full bg-gray-50" />
          <div class="text-sm/6">
            <p class="font-semibold text-gray-900">
              <a href="#">
                <span class="absolute inset-0"></span>
                Michael Foster
              </a>
            </p>
            <p class="text-gray-600">Co-Founder / CTO</p>
          </div>
        </div>
      </article>
      <article class="flex max-w-xl flex-col items-start justify-between">
        <div class="flex items-center gap-x-4 text-xs">
          <time datetime="2020-03-10" class="text-gray-500">Mar 10, 2020</time>
          <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Sales</a>
        </div>
        <div class="group relative grow">
          <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span class="absolute inset-0"></span>
              How to use search engine optimization to drive sales
            </a>
          </h3>
          <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.</p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-10 rounded-full bg-gray-50" />
          <div class="text-sm/6">
            <p class="font-semibold text-gray-900">
              <a href="#">
                <span class="absolute inset-0"></span>
                Lindsay Walton
              </a>
            </p>
            <p class="text-gray-600">Front-end Developer</p>
          </div>
        </div>
      </article>
      <article class="flex max-w-xl flex-col items-start justify-between">
        <div class="flex items-center gap-x-4 text-xs">
          <time datetime="2020-02-12" class="text-gray-500">Feb 12, 2020</time>
          <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Business</a>
        </div>
        <div class="group relative grow">
          <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <a href="#">
              <span class="absolute inset-0"></span>
              Improve your customer experience
            </a>
          </h3>
          <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla eu labore irure incididunt velit cillum quis magna dolore.</p>
        </div>
        <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-10 rounded-full bg-gray-50" />
          <div class="text-sm/6">
            <p class="font-semibold text-gray-900">
              <a href="#">
                <span class="absolute inset-0"></span>
                Tom Cook
              </a>
            </p>
            <p class="text-gray-600">Director of Product</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</div>


src/style.css
@source "../../**/*.{html,py,js}";

    <!-- Tailwind CSS v4 & Custom Styles -->
    <link rel="stylesheet" href="{% static 'dist/style.css' %}">

            <!-- Include the JavaScript -->
    <script src="{% static 'dist/main.js' %}" defer></script>


STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

STATIC_ROOT = BASE_DIR / 'staticfiles'

npm run watch

python manage.py runserver

