<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Registration Form</title>
  <style>
    body {
      font-family: "Poppins", sans-serif;
      background: linear-gradient(135deg, #74ebd5, #9face6);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .form-container {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      width: 350px;
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }
    .input-group {
      position: relative;
      margin-bottom: 20px;
    }
    .input-group input,
    .input-group textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #ccc;
      border-radius: 6px;
      outline: none;
      font-size: 14px;
      transition: 0.3s;
      background: none;
    }
    .input-group label {
      position: absolute;
      left: 12px;
      top: 12px;
      color: #777;
      font-size: 14px;
      pointer-events: none;
      transition: 0.3s ease;
    }
    .input-group input:focus ~ label,
    .input-group input:not(:placeholder-shown) ~ label,
    .input-group textarea:focus ~ label,
    .input-group textarea:not(:placeholder-shown) ~ label {
      top: -10px;
      left: 8px;
      font-size: 12px;
      color: #007bff;
      background: #fff;
      padding: 0 4px;
    }
    .error {
      color: red;
      font-size: 13px;
      margin-top: 3px;
    }
    .success {
      color: green;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      margin-top: 15px;
    }
    input.valid, textarea.valid { border-color: green; }
    input.invalid, textarea.invalid { border-color: red; }
    button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 6px;
      background: #007bff;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;
    }
    button:hover { background: #0056b3; }
  </style>
</head>
<body>
  <div class="form-container">
    <h2>Register</h2>
    <form id="regForm">
      <div class="input-group">
        <input type="text" id="firstName" placeholder=" " required>
        <label for="firstName">First Name</label>
        <div class="error" id="firstNameError"></div>
      </div>
      <div class="input-group">
        <input type="text" id="lastName" placeholder=" " required>
        <label for="lastName">Last Name</label>
        <div class="error" id="lastNameError"></div>
      </div>
      <div class="input-group">
        <input type="password" id="password" placeholder=" " required>
        <label for="password">Password</label>
        <div class="error" id="passwordError"></div>
      </div>
      <div class="input-group">
        <input type="text" id="email" placeholder=" " required>
        <label for="email">Email</label>
        <div class="error" id="emailError"></div>
      </div>
      <div class="input-group">
        <input type="text" id="mobile" placeholder=" " required>
        <label for="mobile">Mobile</label>
        <div class="error" id="mobileError"></div>
      </div>
      <div class="input-group">
        <textarea id="address" placeholder=" " required></textarea>
        <label for="address">Address</label>
        <div class="error" id="addressError"></div>
      </div>
      <button type="submit">Register</button>
      <div class="success" id="successMsg"></div>
    </form>
  </div>

  <script>
    const form = document.getElementById("regForm");

    const validators = {
      firstName: v => /^[A-Za-z]{6,}$/.test(v),
      lastName: v => v.trim() !== "",
      password: v => v.length >= 6,
      email: v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(v),
      mobile: v => /^[0-9]{10}$/.test(v),
      address: v => v.trim() !== ""
    };

    const messages = {
      firstName: "At least 6 alphabets required.",
      lastName: "Last name cannot be empty.",
      password: "Minimum 6 characters required.",
      email: "Enter valid email (name@domain.com).",
      mobile: "Mobile must be exactly 10 digits.",
      address: "Address cannot be empty."
    };
    function validateField(id) {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(id + "Error");
      const value = input.value.trim();

      if (validators[id](value)) {
        input.classList.add("valid");
        input.classList.remove("invalid");
        errorEl.textContent = "";
        return true;
      } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
        errorEl.textContent = messages[id];
        return false;
      }
    }
    // Real-time validation
    Object.keys(validators).forEach(id => {
      document.getElementById(id).addEventListener("input", () => validateField(id));
    });
    // Form submit
    form.addEventListener("submit", e => {
      e.preventDefault();
      let allValid = true;
      Object.keys(validators).forEach(id => {
        if (!validateField(id)) allValid = false;
      });
      if (allValid) {
        document.getElementById("successMsg").textContent = "✅ Registration Successful!";
        form.reset();
        document.querySelectorAll("input, textarea").forEach(el => el.classList.remove("valid"));
      } else {
        document.getElementById("successMsg").textContent = "";
      }
    });
  </script>
</body>
</html>
