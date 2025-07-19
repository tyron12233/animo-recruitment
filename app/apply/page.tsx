"use client";

import type React from "react";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Send,
  User,
  GraduationCap,
  FileText,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const positions = [
  {
    value: "executive-vp",
    label: "Executive Vice President",
    category: "Executive Board",
  },
  { value: "treasurer", label: "Treasurer", category: "Executive Board" },
  {
    value: "project-manager",
    label: "Project Manager",
    category: "Executive Board",
  },
  {
    value: "backend-head",
    label: "Backend Developers Head",
    category: "Development Board",
  },
  {
    value: "devops-manager",
    label: "DevOps Manager",
    category: "Development Board",
  },
  {
    value: "content-creator",
    label: "Content Creator",
    category: "Creatives & Marketing",
  },
  {
    value: "graphic-designer",
    label: "Graphic Designer",
    category: "Creatives & Marketing",
  },
  {
    value: "lasallian-ambassador",
    label: "Lasallian Student Ambassador",
    category: "Others",
  },
];

const programs = [
  "Computer Science",
  "Information Technology",
  "Computer Engineering",
  "Multimedia Arts",
  "Marketing",
  "Communication Arts",
  "Nursing",
  "Psychology",
  "Accountancy",
  "Accounting Information System",
  "Architecture",
  "Tourism",
  "Hospitality Management",
  "Education",
  "Electronics Engineering",
  "Business Administration",
  "Other",
];

const yearLevels = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

const SHEET_URL = `https://script.google.com/macros/s/AKfycbyQ6JjPlJIW7EaoKxom42BQt2LaWoPlP0czy1EmBO_6FTX_c-owTeJTlq1Equ6l9URUQg/exec`;

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    program: "",
    yearLevel: "",
    desiredPosition: "",
    whyJoin: "",
    whatBring: "",
    experience: "",
    availability: "",
    portfolio: "",
    agreeTerms: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new URLSearchParams(
        Object.entries(formData).map(([k, v]) => [k, String(v)])
      );

      // Simulate form submission
      const res = await fetch(SHEET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });
      console.log(await res.text())
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: "Application Submitted!",
      description:
        "Thank you for your interest in joining animo.dev. We'll review your application and get back to you soon.",
    });

    setIsSubmitting(false);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const backgroundElements = useMemo(() => {
    return [...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -40, 0],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          repeat: Number.POSITIVE_INFINITY,
          delay: Math.random() * 3,
          ease: "easeInOut",
        }}
        className={`absolute w-3 h-3 ${
          ["bg-blue-400", "bg-red-400", "bg-green-400", "bg-yellow-400"][
            Math.floor(Math.random() * 4)
          ]
        } ${
          ["rounded-full", "rotate-45", "rounded-sm"][
            Math.floor(Math.random() * 3)
          ]
        }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ));
  }, []);

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
      style={{
        font: "Inter, sans-serif",
      }}
    >
      {/* Enhanced Google-style background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 left-20 w-48 h-48 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-red-400/10 to-red-600/10 rounded-full blur-2xl"
        />

        {/* Floating geometric shapes */}
        {backgroundElements}
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg"></div> */}
              <span className="text-xl font-semibold text-gray-900">
                animo.dev
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Progress Bar */}
          <div className="mb-8 px-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Officer Application
              </h1>
              <span className="min-w-20 text-sm text-gray-500">
                Step {currentStep} of 4
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-red-300 h-2 rounded-full"
                initial={{ width: "25%" }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="bg-white/80 backdrop-blur-sm rounded-3xl">
              <CardHeader className="backdrop-blur-sm border-b border-gray-100">
                <CardTitle className="flex items-center space-x-2 font-bold">
                  {currentStep === 1 && (
                    <>
                      <User className="w-8 h-8 text-blue-500 mr-2" />
                      <span>Personal Information</span>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <GraduationCap className="w-8 h-8 text-green-500 mr-2" />
                      <span>Academic & Position Details</span>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <Heart className="w-8 h-8 text-red-500 mr-2" />
                      <span>Motivation & Experience</span>
                    </>
                  )}
                  {currentStep === 4 && (
                    <>
                      <FileText className="w-8 h-8 text-purple-500 mr-2" />
                      <span>Additional Information</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <motion.div
                  key={currentStep}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="your.email@dlsl.edu.ph"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            placeholder="+63 9XX XXX XXXX"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Academic & Position */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="program">Program/Course *</Label>
                          <Select
                            value={formData.program}
                            onValueChange={(value) =>
                              handleInputChange("program", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your program" />
                            </SelectTrigger>
                            <SelectContent>
                              {programs.map((program) => (
                                <SelectItem key={program} value={program}>
                                  {program}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yearLevel">Year Level *</Label>
                          <Select
                            value={formData.yearLevel}
                            onValueChange={(value) =>
                              handleInputChange("yearLevel", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your year level" />
                            </SelectTrigger>
                            <SelectContent>
                              {yearLevels.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label>Desired Position *</Label>
                        <RadioGroup
                          value={formData.desiredPosition}
                          onValueChange={(value) =>
                            handleInputChange("desiredPosition", value)
                          }
                          className="grid md:grid-cols-2 gap-4"
                        >
                          {positions.map((position) => (
                            <div
                              key={position.value}
                              className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                            >
                              <div className="px-2">
                                <RadioGroupItem
                                  value={position.value}
                                  id={position.value}
                                />
                              </div>
                              <Label
                                htmlFor={position.value}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="font-medium">
                                  {position.label}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {position.category}
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Motivation */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="px-2">
                          <Label htmlFor="whyJoin">
                            Why do you want to join animo.dev?
                          </Label>
                        </div>
                        <Textarea
                          id="whyJoin"
                          className="resize-none rounded-lg p-4"
                          value={formData.whyJoin}
                          onChange={(e) =>
                            handleInputChange("whyJoin", e.target.value)
                          }
                          placeholder="Tell us about your motivation and what attracts you to animo.dev..."
                          rows={4}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="px-4">
                          <Label htmlFor="whatBring">
                            What would you bring as an officer?
                          </Label>
                        </div>
                        <Textarea
                          id="whatBring"
                          className="resize-none rounded-lg p-4"
                          value={formData.whatBring}
                          onChange={(e) =>
                            handleInputChange("whatBring", e.target.value)
                          }
                          placeholder="Describe your skills, experiences, and unique qualities that would benefit the organization..."
                          rows={4}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="px-2">
                          <Label htmlFor="experience">
                            Relevant Experience
                          </Label>
                        </div>
                        <Textarea
                          id="experience"
                          value={formData.experience}
                          className="resize-none rounded-lg p-4"
                          onChange={(e) =>
                            handleInputChange("experience", e.target.value)
                          }
                          placeholder="Share any relevant experience in leadership, technology, design, or related fields..."
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Additional Information */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="availability">
                          Availability & Commitment
                        </Label>
                        <Textarea
                          id="availability"
                          value={formData.availability}
                          onChange={(e) =>
                            handleInputChange("availability", e.target.value)
                          }
                          placeholder="Describe your availability for meetings, events, and officer duties..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">
                          Portfolio/Links (Optional)
                        </Label>
                        <Input
                          id="portfolio"
                          value={formData.portfolio}
                          onChange={(e) =>
                            handleInputChange("portfolio", e.target.value)
                          }
                          placeholder="GitHub, LinkedIn, Behance, or other relevant links..."
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) =>
                            handleInputChange("agreeTerms", checked as boolean)
                          }
                        />
                        <Label htmlFor="agreeTerms" className="text-sm">
                          I agree to the terms and conditions and confirm that
                          all information provided is accurate. *
                        </Label>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6 bg-transparent rounded-3xl"
                  >
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-500 hover:bg-blue-600 px-6 rounded-3xl"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!formData.agreeTerms || isSubmitting}
                      className="bg-green-600 hover:bg-green-700 px-8 rounded-3xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
