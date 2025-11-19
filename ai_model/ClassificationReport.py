import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# -----------------------------
# 1. โหลดโมเดลที่เทรนแล้ว
# -----------------------------
model = tf.keras.models.load_model("mobilenetv2_skin_cancer.h5")

# -----------------------------
# 2. กำหนด test dataset path
# -----------------------------
TEST_DIR = "dataset/test"  
IMG_SIZE = (224, 224)     
BATCH_SIZE = 32

test_datagen = ImageDataGenerator(rescale=1./255)
test_gen = test_datagen.flow_from_directory(
    TEST_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    shuffle=False
)

# -----------------------------
# 3. ทำ Prediction
# -----------------------------
y_pred_probs = model.predict(test_gen)          # shape = (num_samples, num_classes)
y_pred_classes = np.argmax(y_pred_probs, axis=1)
y_true = test_gen.classes                       # label จริง

# -----------------------------
# 4. ดึงชื่อ class
# -----------------------------
class_names = list(test_gen.class_indices.keys())

# -----------------------------
# 5. Classification Report
# -----------------------------
report = classification_report(y_true, y_pred_classes, target_names=class_names)
print("Classification Report:\n")
print(report)

# -----------------------------
# 6. Confusion Matrix 
# -----------------------------
cm = confusion_matrix(y_true, y_pred_classes)
plt.figure(figsize=(8,6))
sns.heatmap(cm, annot=True, fmt="d", xticklabels=class_names, yticklabels=class_names, cmap="Blues")
plt.xlabel("Predicted")
plt.ylabel("True")
plt.title("Confusion Matrix")
plt.show()
