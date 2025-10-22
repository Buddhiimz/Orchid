from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# Load model
model = load_model('models/inception_orchid_final.keras')

# Class labels
CLASS_NAMES = {
    "n0000": "Anoectochilus burmanicus rolfe orchid",
    "n0001": "Bulbophyllum auricomum lindl orchid",
    "n0002": "Bulbophyllum dayanum rchb orchid",
    "n0003": "Bulbophyllum lasiochilum par. & rchb orchid",
    "n0004": "Bulbophyllum limbatum orchid",
    "n0005": "Bulbophyllum longissimum (ridl.) ridl orchid",
    "n0006": "Bulbophyllum medusae (lindl.) rchb orchid",
    "n0007": "Bulbophyllum patens king ex hk.f. orchid",
    "n0008": "Bulbophyllum rufuslabram orchid",
    "n0009": "Bulbophyllum siamensis rchb orchid",
    "n0010": "Calenthe rubens orchid",
    "n0011": "Chiloschista parishii seidenf. orchid",
    "n0012": "Chiloschista viridiflora seidenf. orchid",
    "n0013": "Cymbidium aloifolium (l.) sw. orchid",
    "n0014": "Dendrobium chrysotoxum lindl orchid",
    "n0015": "Dendrobium farmeri paxt. orchid",
    "n0016": "Dendrobium fimbriatum hook orchid",
    "n0017": "Dendrobium lindleyi steud orchid",
    "n0018": "Dendrobium pulchellum roxb orchid",
    "n0019": "Dendrobium pulchellum orchid",
    "n0020": "Dendrobium secundum bl-lindl orchid",
    "n0021": "Dendrobium senile par. & rchb.f. orchid",
    "n0022": "Dendrobium signatum rchb. f orchid",
    "n0023": "Dendrobium thyrsiflorum rchb. f. orchid",
    "n0024": "Dendrobium tortile lindl orchid",
    "n0025": "Dendrobium tortile orchid",
    "n0026": "Hygrochillus parishii var. marrioftiana (rchb.f.) orchid",
    "n0027": "Paphiopedilum bellatulum orchid",
    "n0028": "Paphiopedilum callosum orchid",
    "n0029": "Paphiopedilum charlesworthii orchid",
    "n0030": "Paphiopedilum concolor orchid",
    "n0031": "Paphiopedilum exul orchid",
    "n0032": "Paphiopedilum godefroyae orchid",
    "n0033": "Paphiopedilum gratrixianum orchid",
    "n0034": "Paphiopedilum henryanum orchid",
    "n0035": "Paphiopedilum intanon-villosum orchid",
    "n0036": "Paphiopedilum niveum (rchb.f.) stein orchid",
    "n0037": "Paphiopedilum parishii orchid",
    "n0038": "Paphiopedilum spicerianum orchid",
    "n0039": "Paphiopedilum sukhakulii orchid",
    "n0040": "Pelatantheria bicuspidata (rolfe ex downie) tang & wang orchid",
    "n0041": "Pelatantheria insectiflora (rchb.f.) ridl. orchid",
    "n0042": "Phaius tankervilleae (banks ex i' heritier) blume orchid",
    "n0043": "Phalaenopsis cornucervi (breda) bl. & rchb.f. orchid",
    "n0044": "Rhynchostylis gigantea (lindl.) ridl. orchid",
    "n0045": "Trichoglottis orchideae (koern) garay. orchid",
    "n0046": "Bulbophyllum auratum Lindl. orchid",
    "n0047": "Bulbophyllum morphologorum F.Kranzl. orchid",
    "n0048": "Dendrobium cumulatum Lindl. orchid",
    "n0049": "Maxiralia tenui folia orchid",
    "n0050": "Paphiopedilum vejvarutianum O. Gruss & Roellke orchid",
    "n0051": "Oncidium goldiana orchid"
}

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    img_file = request.files['image']
    img_path = os.path.join('temp', img_file.filename)
    os.makedirs('temp', exist_ok=True)
    img_file.save(img_path)

    # Preprocess
    img = image.load_img(img_path, target_size=(299, 299))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # Predict
    pred = model.predict(img_array)
    pred_index = np.argmax(pred, axis=1)[0]

    # Map to class label
    class_key = f"n{pred_index:04d}"
    label = CLASS_NAMES.get(class_key, "Unknown")

    os.remove(img_path)
    return jsonify({'prediction': label})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)