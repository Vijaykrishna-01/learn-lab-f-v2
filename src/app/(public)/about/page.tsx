"use client";
import React from "react";
import {
  GraduationCap,
  Users,
  Video,
  Award,
  Trophy,
  Globe,
  ArrowRight,
  Quote,
  Star,
  School,
  Headphones,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Target,
  Heart,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "500K+", label: "Active Students", color: "text-blue-600 dark:text-blue-400" },
    { icon: GraduationCap, value: "200+", label: "Expert Instructors", color: "text-green-600 dark:text-green-400" },
    { icon: Video, value: "1,000+", label: "Video Courses", color: "text-purple-600 dark:text-purple-400" },
    { icon: Globe, value: "150+", label: "Countries", color: "text-orange-600 dark:text-orange-400" },
  ];

  const features = [
    {
      icon: Video,
      title: "High-Quality Video Lessons",
      description: "Learn from professionally produced HD video content with downloadable resources and subtitles.",
    },
    {
      icon: Award,
      title: "Certified Courses",
      description: "Earn recognized certificates upon completion to showcase your skills to employers.",
    },
    {
      icon: Trophy,
      title: "Hands-on Projects",
      description: "Apply your knowledge with real-world projects and practical assignments.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it from our dedicated support team and community.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Learning",
      description: "We're driven by a genuine love for education and helping others grow.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in every course and interaction.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a supportive community where everyone can succeed together.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly evolving with new technologies and teaching methods.",
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former Stanford professor with 15+ years in ed-tech",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Michael Chen",
      role: "Head of Curriculum",
      bio: "Expert in instructional design and learning methodologies",
      image: "/api/placeholder/150/150",
    },
    {
      name: "Emma Rodriguez",
      role: "Lead Instructor",
      bio: "Senior developer and bestselling course author",
      image: "/api/placeholder/150/150",
    },
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      content: "This platform transformed my career. The courses are comprehensive and instructors are amazing!",
      rating: 5,
      image: "/api/placeholder/60/60",
    },
    {
      name: "Maria Garcia",
      role: "Data Scientist",
      content: "Best investment I've made in my professional development. The project-based learning is outstanding.",
      rating: 5,
      image: "/api/placeholder/60/60",
    },
    {
      name: "James Wilson",
      role: "Business Owner",
      content: "The flexibility and quality of content make this platform unbeatable. Highly recommended!",
      rating: 5,
      image: "/api/placeholder/60/60",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 dark:opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Empowering Learners Worldwide</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              We're on a Mission to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Democratize Education
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Making high-quality learning accessible, affordable, and engaging for everyone, everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} strokeWidth={1.5} />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-6">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Bridging the Gap Between Ambition and Achievement
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We believe that quality education should be a right, not a privilege. That's why 
                we've created a platform that combines expert instruction, hands-on learning, 
                and community support to help you achieve your goals.
              </p>
              <div className="space-y-3">
                {[
                  "Expert-led courses in cutting-edge fields",
                  "Practical, project-based learning approach",
                  "Flexible learning at your own pace",
                  "Lifetime access to course materials",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <Quote className="w-12 h-12 mb-6 opacity-80" />
                <p className="text-xl leading-relaxed mb-6">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
                <p className="font-semibold">- Nelson Mandela</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate educators and industry experts dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Ready to Begin?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community of over 500,000 learners and unlock your potential
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
          >
            Browse All Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}