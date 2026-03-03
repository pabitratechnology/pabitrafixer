import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { FileText, Award, Globe, Calendar, Loader2, Plus, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

export const PostNotification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [type, setType] = useState<"admit-card" | "result">("admit-card");

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    link: "",
    date: "",
  });

  if (!user || (user.role !== "admin" && user.role !== "recruiter")) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-500">Only admins and recruiters can post notifications.</p>
        <button onClick={() => navigate("/")} className="text-indigo-600 font-bold hover:underline">Go Home</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = type === "admit-card" ? "/admit-cards" : "/results";
      const payload = {
        title: formData.title,
        organization: formData.organization,
        link: formData.link,
        [type === "admit-card" ? "release_date" : "result_date"]: formData.date || new Date(),
      };
      await api.post(endpoint, payload);
      setSuccess(true);
      setTimeout(() => navigate(type === "admit-card" ? "/admit-cards" : "/results"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to post notification.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
          <Plus className="h-10 w-10 text-green-600 rotate-45" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{type === "admit-card" ? "Admit Card" : "Result"} Posted!</h1>
        <p className="text-gray-500 text-center max-w-md">
          The notification has been published. Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back
      </button>

      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Post Notification</h1>
        <p className="text-gray-500">Publish a new admit card or exam result update.</p>
      </div>

      <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
        <button
          onClick={() => setType("admit-card")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            type === "admit-card" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FileText className="h-4 w-4" />
          Admit Card
        </button>
        <button
          onClick={() => setType("result")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            type === "result" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Award className="h-4 w-4" />
          Result
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 mb-8">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Title *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder={type === "admit-card" ? "e.g. SSC CGL 2026 Tier 1 Admit Card" : "e.g. UPSC Civil Services 2025 Final Result"}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Organization *</label>
          <input
            type="text"
            name="organization"
            required
            value={formData.organization}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. Staff Selection Commission"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Direct Link *</label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="url"
              name="link"
              required
              value={formData.link}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="https://official-site.gov.in/download"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              Publish {type === "admit-card" ? "Admit Card" : "Result"}
              <Plus className="h-5 w-5 ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
