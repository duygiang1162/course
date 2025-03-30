import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Lock, CheckCircle, Clock } from 'lucide-react';
import { getCourseBySlug, isEnrolled, enrollInCourse } from '../../lib/api';
import { useAuthStore } from '../../lib/store';
import type { Course, Lesson } from '../../lib/types';

const CourseDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        if (!slug) return;
        const courseData = await getCourseBySlug(slug);
        setCourse(courseData);
        
        if (user) {
          const enrollmentStatus = await isEnrolled(courseData.id);
          setEnrolled(enrollmentStatus);
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [slug, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!course) return;

    setEnrolling(true);
    try {
      await enrollInCourse(course.id);
      setEnrolled(true);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  ${course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}
                >
                  {course.level}
                </span>
                {course.category?.name && (
                  <span className="text-sm text-gray-300">
                    {course.category.name}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-gray-300 mb-6">{course.description}</p>
              <div className="flex items-center space-x-4 mb-8">
                <img
                  className="h-12 w-12 rounded-full"
                  src={course.instructor?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor?.full_name || 'Instructor')}`}
                  alt={course.instructor?.full_name}
                />
                <div>
                  <p className="font-medium">{course.instructor?.full_name}</p>
                  <p className="text-sm text-gray-300">{course.instructor?.bio}</p>
                </div>
              </div>
              {!enrolled && (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {enrolling ? 'Enrolling...' : `Enroll for $${course.price}`}
                </button>
              )}
            </div>
            <div>
              <img
                className="rounded-lg shadow-xl"
                src={course.thumbnail_url || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800`}
                alt={course.title}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <div className="space-y-4">
          {course.lessons?.map((lesson: Lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {lesson.is_free || enrolled ? (
                  <Play className="h-5 w-5 text-blue-600" />
                ) : (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <h3 className="font-medium">{lesson.title}</h3>
                  {lesson.description && (
                    <p className="text-sm text-gray-500">{lesson.description}</p>
                  )}
                </div>
              </div>
              {(lesson.is_free || enrolled) && (
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Watch Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
