import requests
import json

# Define the API URL and headers
url = "http://localhost:3000/auth/register"
headers = {
    "Content-Type": "application/json"
}

# Define the data payload
data = {
    "email": "test@example.com",
    "password": "test123",
    "role": "STUDENT"
}

try:
    # Make the POST request
    response = requests.post(url, headers=headers, data=json.dumps(data))
    
    # Print the status code and response body
    print("Status Code:", response.status_code)
    print("Response Body:", response.json())
except requests.exceptions.RequestException as e:
    print("An error occurred:", e)
