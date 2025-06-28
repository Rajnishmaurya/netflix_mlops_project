# backend_api/app/main.py
from fastapi import FastAPI
from typing import List, Dict # Import types for clarity

app = FastAPI(title="Netflix Backend API") # Add a title

# Hardcoded item data for initial testing
ITEMS_DATA = [
    {"item_id": "1", "title": "Placeholder Movie 1", "genre": "Action"},
    {"item_id": "2", "title": "Placeholder Movie 2", "genre": "Comedy"},
    {"item_id": "3", "title": "Placeholder Movie 3", "genre": "Drama"},
]

# Hardcoded recommendations data for initial testing
RECOMMENDATIONS_DATA = {
    "user_a": [{"item_id": "3", "title": "Placeholder Movie 3"}],
    "user_b": [{"item_id": "1", "title": "Placeholder Movie 1"}, {"item_id": "2", "title": "Placeholder Movie 2"}],
}


@app.get("/")
def read_root():
    return {"message": "Netflix Backend API is running!"}

# Endpoint to get all items
@app.get("/v1/items/", response_model=List[Dict]) # Use Dict for hardcoded data
def get_all_items():
     """Retrieves a list of all available items (hardcoded)."""
     return ITEMS_DATA

# Endpoint to get recommendations for a user
@app.get("/v1/recommendations/{user_id}", response_model=List[Dict]) # Use Dict for hardcoded data
def get_recommendations(user_id: str):
    """Retrieves recommendations for a user (hardcoded placeholder)."""
    # In this basic step, we just return hardcoded data based on user_id
    # Later, this will call the model service
    print(f"Received request for recommendations for user: {user_id}") # Basic logging
    return RECOMMENDATIONS_DATA.get(user_id, []) # Return empty list if user not found