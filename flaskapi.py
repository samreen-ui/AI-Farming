from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import cv2
import os
import pickle  # Add this import

# Initialize Flask app
app = Flask(__name__)

# Load the trained model
MODEL_PATH = r"C:\Users\swarg\Desktop\Udaan\src\resnet_model.pkl"  # Ensure this path points to your saved model file

# Ensure proper model loading with pickle or TensorFlow's loading functions
with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)

# Prediction function
def preprocess_image(file_path):
    # Load the image using OpenCV
    img = cv2.imread(file_path)
    if img is None:
        raise ValueError("Invalid image file")
    
    # Resize to match model input
    img = cv2.resize(img, (224, 224))
    img = img / 255.0  # Normalize to [0, 1]
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        file_path = os.path.join('temp', file.filename)
        file.save(file_path)

        # Preprocess the image
        img = preprocess_image(file_path)

        # Make a prediction
        prediction = model.predict(img)
        class_idx = np.argmax(prediction, axis=1)[0]
        confidence = float(np.max(prediction))

        # Remove the temp file
        os.remove(file_path)

        return jsonify({
            'class': list(model.class_indices.keys())[class_idx],
            'confidence': confidence
        })

    except Exception as e:
        # Log error details
        import traceback
        error_message = traceback.format_exc()
        print("Error occurred:", error_message)
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
