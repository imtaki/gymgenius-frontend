<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GymGenius - Verify </title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .main {
      padding: 20px;
    }
    .header {
      text-align: center;
      border-bottom: 1px solid #eaeaea;
    }
    .content {
      padding-top: 20px;
    }
    .code-container {
      text-align: center;
      margin-top: 20px;
    }
    .code {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main">
      <div class="header">
        <h1>Welcome, {{ $user->name }}!</h1>
      </div>
      
      <div class="content">
        <p>We're thrilled to have you here. To get started and secure your account, please enter the following verification code in the app:</p>
        
        <div class="code-container">
          <div class="code">{{ $code }}</div>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px;">
          If you didn't request this code, you can safely ignore this email.
        </p>
      </div>
    </div>
    
    <div class="footer">
      &copy; {{ date('Y') }} GymGenius. All rights reserved.
    </div>
  </div>
</body>
</html>