import React, { useState, useRef } from "react";
import StickyNavbar from "../components/Navbar";
import { FiCamera, FiImage, FiX } from "react-icons/fi";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Analysis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreviewURL(imageSrc);
    setIsCameraOpen(false);
  };

  const onRemoveImage = () => {
    setPreviewURL(null);
    setSelectedImage(null);
  };

  const handleAnalyze = async () => {
    if (!previewURL) {
      Swal.fire({
      icon: "warning",
      title: "กรุณาอัปโหลดหรือถ่ายภาพก่อนวิเคราะห์",
      showConfirmButton: false,
      timer: 1500
    });
      return;
    }

    const formData = new FormData();
    let blob = null;

    if (selectedImage) {
      // ถ้าอัปโหลดไฟล์
      formData.append("file", selectedImage);
    } else {
      // ถ้าถ่ายจากกล้อง
      blob = await (await fetch(previewURL)).blob();
      formData.append("file", blob, "captured.jpg");
    }

    try {
      const res = await axios.post("http://localhost:8000/predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/result", {
        state: {
          result: res.data.result,
          predictedClass: res.data.predicted_class,
          confidence: res.data.confidence,
          imageUrl: previewURL,
          imageFile: selectedImage || blob,
        },
      });

      // const predictionResult = res.data.result;

      // Object.entries(predictionResult).forEach(([label, value]) => {
      //   console.log(`${label}: ${(value * 100).toFixed(2)}%`);
      // });
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      Swal.fire({
      icon: "error",
      title: "วิเคราะห์ไม่สำเร็จ กรุณาลองใหม่",
      showConfirmButton: false,
      timer: 1500
    });
    }
  };

  return (
    <>
      <StickyNavbar />
      <div className="bg-[#E9FBFC] min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center">
          วิเคราะห์ภาพรอยโรค
        </h2>
        <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
          ถ่ายภาพ หรือ อัปโหลดภาพรอยโรคผิวหนังของคุณเพื่อเริ่มการวิเคราะห์
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* ปุ่มถ่ายภาพ */}
        <button
          onClick={() => setIsCameraOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer"
        >
          <FiCamera />
          ถ่ายภาพจากกล้อง
        </button>

        {/* ปุ่มอัปโหลด */}
        <label className="flex items-center justify-center gap-2 border-2 border-teal-600 text-teal-700 px-8 py-3 rounded-full cursor-pointer text-lg font-semibold hover:bg-teal-50 hover:border-teal-700 transition duration-300 transform hover:scale-105 ">
          <FiImage />
          อัปโหลดภาพจากเครื่อง
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        </div>

        {/* กล่องแสดงภาพที่อัปโหลด */}
        <div className="relative w-full max-w-lg min-h-[250px] md:min-h-[350px] flex items-center justify-center mb-8 bg-white border-2 border-dashed border-gray-300 rounded-2xl shadow-lg p-4">
          {previewURL ? (
            <>
              {/* ปุ่ม X สำหรับลบภาพ */}
              <button
                onClick={onRemoveImage}
                className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100"
                title="ลบรูปภาพ"
              >
                <FiX className="text-xl" />
              </button>

              {/* แสดงรูปภาพ */}
              <img
                src={previewURL}
                alt="preview"
                className="object-contain h-full rounded-xl"
              />
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <FiImage className="text-4xl mb-2" />
              <span>รูปภาพของคุณจะแสดงที่นี่</span>
            </div>
          )}
        </div>

        {/* ปุ่มวิเคราะห์ */}
        <button
          onClick={handleAnalyze}
          className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-12 py-4 rounded-full text-xl font-bold shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer"
        >
          วิเคราะห์รูปภาพ
        </button>

        {/* กล้อง */}
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-4">
            <h3 className="text-white text-2xl font-semibold mb-6">ถ่ายภาพรอยโรค</h3>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-xl shadow-2xl mb-6 w-full max-w-xl border-4 border-white"
              mirrored={false}
              videoConstraints={{
                facingMode: "environment"
              }}
            />
            
            <div className="flex gap-4">
                <button
                    onClick={handleCapture}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition duration-200 flex items-center gap-2"
                >
                    <FiCamera className="text-xl" />
                    ถ่ายภาพ
                </button>
                <button
                    onClick={() => setIsCameraOpen(false)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition duration-200 flex items-center gap-2"
                >
                    <FiX className="text-xl" />
                    ยกเลิก
                </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Analysis;
