import requests

BASE_URL = "http://127.0.0.1:8000"

def test_wallet_flow():
    # 1. Register a user
    print("Registering user...")
    res = requests.post(f"{BASE_URL}/auth/register", json={
        "name": "Test User",
        "email": "test2@impactwallet.com",
        "password": "password123"
    })
    
    if res.status_code != 201:
        # Maybe already exists, try login
        res = requests.post(f"{BASE_URL}/auth/login", json={
            "email": "test2@impactwallet.com",
            "password": "password123"
        })
        token = res.json()["access_token"]
    else:
        # Login to get token
        res = requests.post(f"{BASE_URL}/auth/login", json={
            "email": "test2@impactwallet.com",
            "password": "password123"
        })
        token = res.json()["access_token"]

    headers = {"Authorization": f"Bearer {token}"}

    # 2. Get Wallet
    print("Fetching wallet...")
    res = requests.get(f"{BASE_URL}/wallet/me", headers=headers)
    print("Initial Wallet:", res.json())

    # 3. Add Money
    print("Adding ₹500 to wallet...")
    res = requests.post(f"{BASE_URL}/wallet/add", json={"amount": 500}, headers=headers)
    print("Wallet after add:", res.json())

if __name__ == "__main__":
    test_wallet_flow()
