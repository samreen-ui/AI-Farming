from flask import Flask, request, jsonify
import joblib
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import img_to_array, load_img
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# Load models and encoders for Rainfall and Yield Prediction
# Rainfall Prediction Model
rf_model_rainfall = joblib.load('../src/requirements.txt/rf_model_rainfall.pkl')
label_encoder_state_rainfall = joblib.load('../src/requirements.txt/label_encoder_state.pkl')

# Crop Yield Prediction Model
rf_yield_model = joblib.load('../src/requirements.txt/crop_yield_model.pkl')
label_encoder_state_yield = joblib.load('../src/requirements.txt/label_encoder_state.pkl')
label_encoder_crop_yield = joblib.load('../src/requirements.txt/label_encoder_crop.pkl')

# Load models and encoders for Crop Name Prediction
rf_crop_model = joblib.load('../src/require.txt/crop_prediction_model.pkl')
scaler_crop = joblib.load('../src/require.txt/scaler.pkl')
label_encoder_crop_new = joblib.load('../src/require.txt/crop_encoder.pkl')
label_encoder_season_new = joblib.load('../src/require.txt/season_encoder.pkl')
label_encoder_state_crop_new = joblib.load('../src/require.txt/state_encoder.pkl')

# Load the crop classification model
global crop_model
crop_model_path = r"C:\Users\swarg\Desktop\Udaan\src\crop_classification_model1.keras"  # Replace with your .keras model file
crop_model = load_model(crop_model_path)
print("Crop Classification model loaded successfully.")

# Load the land classification model
global land_model
land_model_path = r"C:\Users\swarg\Desktop\Udaan\src\land_classification_model.keras"  # Replace with your .keras model file
land_model = load_model(land_model_path)
land_class_names = ['agri', 'barrenland', 'urban', 'grassland']  # Replace with your actual land class labels
print("Land Classification model loaded successfully.")

# Rainfall Prediction Endpoint
@app.route('/predict_rainfall', methods=['POST'])
def predict_rainfall():
    data = request.json
    crop_year = data['year']
    state = data['state']

    state_encoded = label_encoder_state_rainfall.transform([state])[0]
    input_data = np.array([[crop_year, state_encoded]])
    predicted_rainfall = rf_model_rainfall.predict(input_data)[0]

    return jsonify({'predicted_rainfall': predicted_rainfall})


# Crop Name Prediction Endpoint
@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    try:
        data = request.json
        crop_year = data['year']
        state = data['state']
        season = data['season']
        area = data['area']
        production = data['production']
        rainfall = data['rainfall']
        fertilizer = data['fertilizer']
        pesticides = data['pesticides']
        yield_value = data['yield']

        state_encoded = label_encoder_state_crop_new.transform([state])[0]
        season_encoded = label_encoder_season_new.transform([season])[0]
        input_data = np.array([[crop_year, state_encoded, season_encoded, area, production, rainfall, fertilizer, pesticides, yield_value]])
        input_data_scaled = scaler_crop.transform(input_data)

        predicted_crop = rf_crop_model.predict(input_data_scaled)
        predicted_crop_name = label_encoder_crop_new.inverse_transform(predicted_crop)[0]

        return jsonify({'predicted_crop': predicted_crop_name})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Crop Yield Prediction Endpoint
@app.route('/predict_yield', methods=['POST'])
def predict_yield():
    data = request.json
    crop_year = data['year']
    state = data['state']
    crop_name = data['crop_name']
    rainfall = data['rainfall']
    fertilizer = data['fertilizer']
    pesticides = data['pesticides']

    state_encoded = label_encoder_state_yield.transform([state])[0]
    crop_encoded = label_encoder_crop_yield.transform([crop_name])[0]
    input_data = np.array([[crop_year, state_encoded, rainfall, crop_encoded, fertilizer, pesticides]])
    predicted_yield = rf_yield_model.predict(input_data)[0]

    return jsonify({'predicted_yield': predicted_yield})


# Crop Classification Endpoint
@app.route('/predict_crop_image', methods=['POST'])
def predict_crop_image():
    try:
        file = request.files.get('image')
        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        img = load_img(BytesIO(file.read()), target_size=(224, 224))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = crop_model.predict(img_array)
        crop_classes = ['jute', 'maize', 'rice', 'sugarcane', 'wheat']  # Replace with your actual crop labels
        predicted_class_index = np.argmax(prediction[0])
        predicted_crop = crop_classes[predicted_class_index]

        return jsonify({"predicted_crop": predicted_crop})
    except Exception as e:
        return jsonify({"error": "Crop image prediction failed"}), 500


# Corrected Land Classification Endpoint
@app.route('/predict_land', methods=['POST'])
def predict_land():
    """
    Predict land classification based on an uploaded image.
    """
    try:
        file = request.files.get('image')
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        # Log the file details
        print(f"Received file: {file.filename}")

        # Open the image using PIL
        img = Image.open(BytesIO(file.read())).convert('RGB')  # Ensure RGB format
        img = img.resize((224,224))  # Resize to match model input size
        img_array = np.array(img) / 255.0  # Normalize to [0, 1]
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make prediction
        predictions = land_model.predict(img_array)
        predicted_class = land_class_names[np.argmax(predictions)]
        confidence = float(np.max(predictions))

        return jsonify({'class': predicted_class, 'confidence': confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
