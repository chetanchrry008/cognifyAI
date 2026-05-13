"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Clock, PlayCircle } from 'lucide-react';
import Image from 'next/image';

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  students: number;
  image: string;
}

export default function CourseSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch courses:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <motion.div
          key={course.id}
          whileHover={{ y: -10 }}
          className="group relative bg-card/40 rounded-3xl overflow-hidden border border-white/5 hover:border-secondary/30 transition-all duration-500"
        >
          {/* Course Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <PlayCircle size={48} className="text-white" />
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-yellow-500 gap-1">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-bold">{course.rating}</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center text-white/40 gap-1">
                <Users size={14} />
                <span className="text-xs">{course.students.toLocaleString()} students</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
              {course.title}
            </h3>
            <p className="text-white/40 text-sm mb-6">by {course.instructor}</p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/60">
                <Clock size={16} />
                <span className="text-xs font-medium">{course.duration}</span>
              </div>
              <button className="text-sm font-bold text-white bg-secondary/20 px-4 py-2 rounded-xl hover:bg-secondary hover:text-white transition-all">
                Enroll Now
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
