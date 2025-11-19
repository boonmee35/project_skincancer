from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io

app = FastAPI()

# อนุญาต React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# โหลดโมเดล
model = load_model("mobilenetv2_skin_cancer.h5")
class_names = ['bcc', 'mel', 'nv', 'scc', 'unknown']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = img.resize((224, 224)) 
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)[0]

    result = {
        class_names[i]: round(float(prediction[i]), 2)
        for i in range(len(class_names))
    }

    return {
        "result": result,
        "predicted_class": class_names[np.argmax(prediction)],
        "confidence": round(float(np.max(prediction)), 2)
    }