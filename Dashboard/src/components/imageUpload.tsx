'use client'
import React, { useState } from "react";
import Image from "next/image";

export default function ImageUpload() {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
            
            // Create previews for new files
            const newPreviews = newFiles.map(file => {
                try {
                    return URL.createObjectURL(file);
                } catch (error) {
                    console.error('Error creating preview:', error);
                    return '/placeholder-image.jpg'; // Fallback image
                }
            });
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    }

    function removeFile(index: number) {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => {
            const previewToRemove = prev[index];
            if (previewToRemove && previewToRemove.startsWith('blob:')) {
                URL.revokeObjectURL(previewToRemove); // Clean up the object URL
            }
            return prev.filter((_, i) => i !== index);
        });
    }

    return (
        <div>
            <p className="font-medium mb-4">Upload your property images here. You can upload up to 10 images.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {previews.map((preview, index) => (
                    <div key={index} className="relative">
                        <div className="relative w-full h-48">
                            <Image 
                                src={preview || '/placeholder-image.jpg'} 
                                alt={`Preview ${index + 1}`} 
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder-image.jpg';
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {previews.length === 0 && (
                <div className="preview-box flex justify-center rounded-md shadow-sm dark:shadow-gray-800 overflow-hidden bg-gray-50 dark:bg-slate-800 text-slate-400 p-2 text-center small w-auto max-h-60">
                    Supports JPG, PNG and MP4 videos. Max file size: 10MB.
                </div>
            )}

            <input 
                type="file" 
                id="input-file" 
                name="images" 
                accept="image/*" 
                onChange={handleChange} 
                multiple 
                className="hidden"
            />
            <label 
                className="btn-upload btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-6 cursor-pointer" 
                htmlFor="input-file"
            >
                Upload Images
            </label>
        </div>
    );
}