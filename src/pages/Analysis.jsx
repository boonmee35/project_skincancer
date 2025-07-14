import React, { useState, useRef } from 'react'
import StickyNavbar from '../components/Navbar'
import { FiCamera, FiImage, FiX } from 'react-icons/fi'
import Webcam from 'react-webcam'

function Analysis() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const webcamRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setPreviewURL(URL.createObjectURL(file))
    }
  }

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setPreviewURL(imageSrc)
    setIsCameraOpen(false)
  }

  const onRemoveImage = () => {
    setPreviewURL(null)
    setSelectedImage(null)
  }

  const handleAnalyze = () => {
    if (!previewURL) {
      alert('กรุณาอัปโหลดหรือถ่ายภาพก่อน')
      return
    }
    alert('กำลังวิเคราะห์ภาพ...')
    // ส่ง previewURL ไปยัง API
  }

  return (
    <>
      <StickyNavbar />
      <div className="bg-[#E9FBFC] min-h-screen flex flex-col items-center justify-center px-6 py-16">
  <h2 className="text-3xl font-semibold text-gray-800 mb-4">วิเคราะห์ภาพรอยโรค</h2>
  <p className="text-base text-gray-600 mb-8 text-center max-w-xl">
    ถ่ายภาพ หรือ อัปโหลดภาพรอยโรคผิวหนังของคุณเพื่อเริ่มการวิเคราะห์
  </p>

        {/* ปุ่มถ่ายภาพ */}
        <button
          onClick={() => setIsCameraOpen(true)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg mb-4 text-lg"
        >
          <FiCamera />
          ถ่ายภาพ
        </button>

        {/* ปุ่มอัปโหลด */}
        <label className="flex items-center gap-2 border border-teal-600 text-teal-600 px-8 py-3 rounded-lg cursor-pointer mb-5 text-lg">
          <FiImage />
          อัปโหลดภาพรอยโรค
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* กล่องแสดงภาพที่อัปโหลด */}
        <div className="relative w-80 h-80 md:w-[450px] md:h-[300px] flex items-center justify-center mb-5 rounded-xl bg-white border-2 border-dashed border-gray-300">
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
          <span>รูปภาพจะแสดงที่นี่</span>
        </div>
      )}
    </div>

        {/* ปุ่มวิเคราะห์ */}
        <button
          onClick={handleAnalyze}
          className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-3 rounded-lg text-lg"
        >
          วิเคราะห์รูปภาพ
        </button>

        {/* กล้อง */}
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg mb-4 w-[90%] max-w-md"
            />
            <button
              onClick={handleCapture}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mb-2"
            >
              ถ่ายภาพ
            </button>
            <button
              onClick={() => setIsCameraOpen(false)}
              className="text-white underline"
            >
              ปิดกล้อง
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Analysis
