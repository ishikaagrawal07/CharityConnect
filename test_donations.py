import requests

BASE_URL = "http://127.0.0.1:8000"

def test_end_to_end():
    # 1. Register a new user
    print("\n--- 1. Register User ---")
    email = "donor@impactwallet.com"
    res = requests.post(f"{BASE_URL}/auth/register", json={
        "name": "Donor User",
        "email": email,
        "password": "password123"
    })
    
    if res.status_code == 201 or res.status_code == 400:
        # Always login to get token
        res = requests.post(f"{BASE_URL}/auth/login", json={
            "email": email,
            "password": "password123"
        })
    token = res.json().get("access_token")
    if not token:
        print("Auth failed:", res.json())
        return

    headers = {"Authorization": f"Bearer {token}"}

    # 2. Add Money to Wallet
    print("\n--- 2. Add Money ---")
    requests.post(f"{BASE_URL}/wallet/add", json={"amount": 1000}, headers=headers)
    res = requests.get(f"{BASE_URL}/wallet/me", headers=headers)
    print("Wallet Balance:", res.json().get('balance'))

    # 3. List Causes
    print("\n--- 3. List Causes ---")
    res = requests.get(f"{BASE_URL}/causes", headers=headers)
    causes = res.json()
    print(f"Found {len(causes)} causes.")
    cause_id = causes[0]["id"]
    cause_name = causes[0]["name"]
    print(f"Selected Cause: {cause_name}")

    # 4. Donate
    print("\n--- 4. Donate ---")
    res = requests.post(f"{BASE_URL}/donations/donate", json={
        "cause_id": cause_id,
        "amount": 200
    }, headers=headers)
    print("Donation Response:", res.json())

    # 5. Verify Wallet Balance
    print("\n--- 5. Verify Wallet ---")
    res = requests.get(f"{BASE_URL}/wallet/me", headers=headers)
    print("New Wallet Balance:", res.json().get('balance'))

    # 6. View History
    print("\n--- 6. Donation History ---")
    res = requests.get(f"{BASE_URL}/donations/history", headers=headers)
    print("History:", res.json())

if __name__ == "__main__":
    test_end_to_end()
