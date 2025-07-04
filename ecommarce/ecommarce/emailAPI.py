
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText   
    
def sendMail(email, password):
    from django.conf import settings
    from django.utils.crypto import get_random_string
    import urllib.parse
    
    me = settings.EMAIL_HOST_USER
    you = email
    
    # Generate verification token
    verification_token = get_random_string(32)
    
    # Save token to user's profile (update models.py first)
    from .models import register
    user = register.objects.get(email=email)
    user.verification_token = verification_token
    user.save()
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Welcome to Code Alpha E-commarce Shop - Verify Your Account"
    msg['From'] = me
    msg['To'] = you
    
    # Create verification link with token
    verification_link = f"{settings.SITE_URL}/verify?token={verification_token}&email={urllib.parse.quote(email)}"
    
    html = f"""
    <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .button {{ background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; 
                          border-radius: 4px; display: inline-block; margin: 20px 0; }}
                .warning {{ color: #ff4444; font-size: 0.9em; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Code Alpha - E-commarce !</h1>
                <p>Thank you for registering. To complete your registration and verify your account, please click the button below:</p>
                
                <a href="{verification_link}" class="button">Verify Your Account</a>
                
                <p>Your login credentials:</p>
                <ul>
                    <li><strong>Email:</strong> {email}</li>
                    <li><strong>Password:</strong> {password}</li>
                </ul>
                
                <p class="warning">Please keep these credentials safe and don't share them with anyone.</p>
                
                <p>If you didn't create this account, please ignore this email.</p>
                
                <hr>
                <p style="font-size: 0.8em; color: #666;">
                    This is an automated message, please do not reply to this email.
                </p>
            </div>
        </body>
    </html>
    """
    
    s = smtplib.SMTP('smtp.gmail.com', 587) 
    s.starttls() 
    s.login("nitinsen70671@gmail.com", "onfaixvxqtguhjvn") 
    
    part2 = MIMEText(html, 'html')
    
    msg.attach(part2)
    
    s.sendmail(me,you, str(msg)) 
    s.quit() 
    print("mail send successfully....")
    