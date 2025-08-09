## **🛠 Step-by-Step Workflow**

1. **Create & Configure Django Project**

   ```bash
   python -m venv .venv
   pip install django
   django-admin startproject hms_project .
   python manage.py startapp core
   ```

   * Add `core` to `INSTALLED_APPS` in `settings.py`
   * Create first view in `core/views.py` and configure `urls.py`

2. **Install & Configure HTMX in Django**

   ```bash
   pip install django-htmx
   ```

   Add to `INSTALLED_APPS`:

   ```python
   "django_htmx"
   ```

   Add to `MIDDLEWARE`:

   ```python
   "django_htmx.middleware.HtmxMiddleware"
   ```

   Include `{% load django_htmx %}` in your templates and `{% htmx_script %}` in `<head>`.

3. **Example HTMX Endpoint**

   * `views.py`

     ```python
     from django.http import JsonResponse
     def simple_message(request):
         return JsonResponse({'message': 'Hello from the server!'})
     ```
   * `urls.py`

     ```python
     path('simple_message/', views.simple_message, name='simple_message')
     ```
   * HTML Button Example:

     ```html
     <button hx-get="{% url 'simple_message' %}" hx-target="#response-message" hx-swap="innerHTML">
         Get Server Message
     </button>
     ```

4. **Set Up Vite with Tailwind**

   ```bash
   npm create vite@latest hms-frontend
   cd hms-frontend
   npm install tailwindcss @tailwindcss/vite
   ```

   * `vite.config.ts`:

     ```javascript
     import { defineConfig } from 'vite'
     import tailwindcss from '@tailwindcss/vite'
     export default defineConfig({
       plugins: [tailwindcss()]
     })
     ```
   * `src/style.css`

     ```css
     @import "tailwindcss";
     ```

5. **Install & Configure Alpine.js**

   ```bash
   npm install alpinejs
   ```

   * `src/main.js`

     ```javascript
     import Alpine from 'alpinejs'
     window.Alpine = Alpine
     Alpine.start()
     ```

6. **Link Vite Output to Django Static Files**

   * `vite.config.js`:

     ```javascript
     build: {
       outDir: '../static/dist',
       emptyOutDir: true,
       rollupOptions: {
         input: { main: './src/main.js', style: './src/style.css' },
         output: {
           entryFileNames: '[name].js',
           assetFileNames: '[name][extname]'
         }
       },
       sourcemap: true
     }
     ```
   * Django `settings.py`:

     ```python
     STATICFILES_DIRS = [BASE_DIR / 'static']
     STATIC_ROOT = BASE_DIR / 'staticfiles'
     ```

7. **Run Everything**

   ```bash
   npm run watch
   python manage.py runserver
   ```

---

## **📂 Project Repository**

🔗 [GitHub Repo – Django + Vite + Tailwind + Alpine.js + HTMX](https://github.com/MrAhmedElsayed/Hospital-Management-System.git)

---

## **📚 Official Documentation**

* Django: [https://docs.djangoproject.com/en/5.2/intro/tutorial01/](https://docs.djangoproject.com/en/5.2/intro/tutorial01/)
* Django-HTMX: [https://django-htmx.readthedocs.io/en/latest/installation.html](https://django-htmx.readthedocs.io/en/latest/installation.html)
* Tailwind with Vite: [https://tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)
* Alpine.js: [https://alpinejs.dev/essentials/installation#as-a-module](https://alpinejs.dev/essentials/installation#as-a-module)

---

