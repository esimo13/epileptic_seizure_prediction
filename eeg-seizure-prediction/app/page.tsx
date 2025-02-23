"use client";

import { useState } from "react";
import axios from "axios";
import { Upload, AlertTriangle, Brain, FileText, Activity } from "lucide-react";

export default function EEGSeizurePrediction() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [severity, setSeverity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const generateSeverity = (): string => {
    const severityLevels = ["High", "Moderate", "Low"];
    return severityLevels[Math.floor(Math.random() * severityLevels.length)];
  };

  const getRecommendation = () => {
    const recommendations = {
      High: {
        title: "Emergency Action Required",
        actions: [
          "Call emergency services (999) immediately",
          "Move to a safe position",
          "Contact your designated emergency contact",
          "Take prescribed emergency medication if available",
        ],
      },
      Moderate: {
        title: "Immediate Precautions Needed",
        actions: [
          "Stop current activities",
          "Sit or lie down in a safe place",
          "Contact a family member or caregiver",
          "Prepare emergency medication",
        ],
      },
      Low: {
        title: "Preventive Measures",
        actions: [
          "Take a break from current activities",
          "Find a quiet place to rest",
          "Practice relaxation techniques",
          "Monitor symptoms for any changes",
        ],
      },
    };

    if (!severity) return null;

    const rec = recommendations[severity as keyof typeof recommendations];

    return (
      <div className="mt-6 bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">{rec.title}</h3>
        <ul className="space-y-2">
          {rec.actions.map((action, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="h-2 w-2 bg-yellow-400 rounded-full" />
              {action}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a file");
      return;
    }
    setError(null);
    setLoading(true);
    setPrediction(null);
    setSeverity(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<{ prediction: string }>(
        "http://127.0.0.1:5000/predict",
        formData
      );

      if (response.status === 200 && response.data.prediction) {
        setPrediction(response.data.prediction);

        if (response.data.prediction.includes("Preictal")) {
          setSeverity(generateSeverity());
        }
      } else {
        setError("Unexpected API response format");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Error processing the file. Please try again.");
    } finally {
      setLoading(false);
    }
    // try {
    //   const response = await axios.post(
    //     "http://127.0.0.1:5000/predict",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       withCredentials: true,  // Ensure CORS credentials are supported
    //     }
    //   );
  
    //   if (response.status === 200 && response.data.prediction) {
    //     setPrediction(response.data.prediction);
    //     if (response.data.prediction.includes("Preictal")) {
    //       setSeverity(generateSeverity());
    //     }
    //   }
    // } catch (err) {
    //   console.error("API Error:", err);
    //   setError("Error uploading file. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };


  const getPredictionStyle = () => {
    if (!prediction) return ""; // Return empty string instead of an object
  
    const styles = {
      base: "fixed inset-0 transition-colors duration-500 -z-10",
      interictal: "bg-gradient-to-b from-green-900/50 to-green-600/30",
      preictal: "bg-gradient-to-b from-yellow-900/50 to-yellow-600/30",
      ictal: "bg-gradient-to-b from-red-900/50 to-red-600/30",
    };
  
    if (prediction.includes("Interictal")) return `${styles.base} ${styles.interictal}`;
    if (prediction.includes("Preictal")) return `${styles.base} ${styles.preictal}`;
    if (prediction.includes("Ictal")) return `${styles.base} ${styles.ictal}`;
  
    return styles.base; // Default case to return the base class
  };

  return (
    <>
      <div className={getPredictionStyle()} />
      <div className="min-h-screen bg-gradient-to-b from-black/80 to-black/40 text-white">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Brain className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-yellow-400">EEG Seizure Prediction</h1>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <p className="text-lg text-yellow-100/80">
                Upload an EEG text file for instant seizure activity prediction
              </p>
            </div>

            <div className="relative">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-black/30 border-2 border-yellow-400/30 border-dashed rounded-lg hover:bg-black/40 cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-yellow-400" />
                  <p className="mb-2 text-sm text-yellow-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-yellow-400/60">.txt files only</p>
                </div>
              </label>
              {file && (
                <div className="mt-4 flex items-center gap-2 text-yellow-400">
                  <FileText className="w-4 h-4" />
                  <span>{file.name}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all duration-200
                  ${loading || !file
                    ? "bg-yellow-900/30 text-yellow-400/30 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-pulse" />
                    Processing...
                  </div>
                ) : (
                  "Analyze EEG Data"
                )}
              </button>
            </div>

            {error && (
              <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-950/30 p-4 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
                {error}
              </div>
            )}
          </div>

          {prediction && (
            <div className="space-y-6">
              <div className={`
                p-6 rounded-lg backdrop-blur-sm text-center
                ${prediction.includes("Interictal") && "bg-green-950/30 text-green-400"}
                ${prediction.includes("Preictal") && "bg-yellow-950/30 text-yellow-400"}
                ${prediction.includes("Ictal") && "bg-red-950/30 text-red-400"}
              `}>
                <h2 className="text-2xl font-bold mb-2">
                  {prediction.includes("Interictal") && "Normal Brain Activity"}
                  {prediction.includes("Preictal") && "Seizure Warning"}
                  {prediction.includes("Ictal") && "Seizure Occurring"}
                </h2>
                {severity && (
                  <div className="mt-2 text-lg">
                    Severity Level: <span className="font-bold">{severity}</span>
                  </div>
                )}
              </div>

              {getRecommendation()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}