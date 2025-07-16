# CodeAlpha-ecommerce

🛍️ E-Commerce Store (Django Based)
A fully functional E-commerce web application built using Django for the backend and HTML, CSS, and JavaScript for the frontend. This project was developed as part of my internship at Code Alpha and demonstrates key features of a modern online shopping platform.

📌 Features
🔐 User Registration & Login

✅ Email Verification for new users

👤 User Profile Management

📦 Product Categories (Dynamic)

🛒 Add to Cart

🔎 Product Search

💳 PayPal Payment Integration

📬 Order Confirmation via Email

📊 Admin Dashboard for Product Management

🧑‍💻 Tech Stack
Backend: Django (Python)

Frontend: HTML, CSS, JavaScript

Database: SQLite3 (default Django DB)

Authentication: Django's Built-in Auth System

Payments: PayPal Sandbox API

📂 Project Structure
bash
Copy
Edit
ecommerce_store/
│
├── users/                # User-related views, forms, models
├── products/             # Product models and display logic
├── cart/                 # Cart and wishlist handling
├── orders/               # Order placement and payment
├── templates/            # HTML templates
├── static/               # CSS, JS, Images
├── manage.py
└── requirements.txt
⚙️ How to Run Locally
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/ecommerce-store.git
cd ecommerce-store
Create Virtual Environment

bash
Copy
Edit
python -m venv venv
venv\Scripts\activate  # On Windows
Install Dependencies

bash
Copy
Edit
pip install -r requirements.txt
Run Migrations

bash
Copy
Edit
python manage.py migrate
Start the Server

bash
Copy
Edit
python manage.py runserver
Visit

cpp
Copy
Edit
http://127.0.0.1:8000/
📷 Screenshots
(Add relevant screenshots of your home page, product page, cart, and checkout here)

🏆 Internship Acknowledgment
This project was developed as a part of my 1-month Web Development Internship at Code Alpha.
It helped me gain hands-on experience with Django, user authentication, and payment gateway integration.

📧 Contact
Nitin Sen
📧 Email: nitinsen92650@gmail.com
🔗 LinkedIn: www.linkedin.com/in/
nitin-sen-972a7130a


