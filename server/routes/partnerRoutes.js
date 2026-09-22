const express = require('express');
const { protect, partner } = require('../middleware/authMiddleware');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard', protect, partner, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ paymentStatus: 'completed' })
      .populate('course', 'title category price')
      .sort({ createdAt: -1 });

    const learnerIdentifiers = [...new Set(enrollments.map((enrollment) => enrollment.studentEmail))];
    const learners = await User.find({ emailOrPhone: { $in: learnerIdentifiers } })
      .select('name email emailOrPhone phone createdAt')
      .lean();
    const learnerMap = new Map(learners.map((learner) => [learner.emailOrPhone, learner]));

    const courseMap = new Map();
    enrollments.forEach((enrollment) => {
      const courseId = enrollment.course?._id?.toString() || 'unknown';
      const current = courseMap.get(courseId) || {
        courseId,
        title: enrollment.course?.title || 'Course unavailable',
        category: enrollment.course?.category || 'Uncategorized',
        enrollments: 0,
        revenue: 0
      };
      current.enrollments += 1;
      current.revenue += Number(enrollment.amountPaid) || 0;
      courseMap.set(courseId, current);
    });

    const records = enrollments.map((enrollment) => {
      const learner = learnerMap.get(enrollment.studentEmail);
      return {
        _id: enrollment._id,
        studentName: learner?.name || enrollment.studentEmail.split('@')[0],
        studentEmail: enrollment.studentEmail,
        courseTitle: enrollment.course?.title || 'Course unavailable',
        category: enrollment.course?.category || 'Uncategorized',
        amountPaid: enrollment.amountPaid,
        paymentStatus: enrollment.paymentStatus,
        progress: enrollment.progress,
        completed: enrollment.completed,
        invoiceNumber: enrollment.invoiceNumber,
        invoiceUrl: enrollment.invoiceUrl,
        certificateUrl: enrollment.certificateUrl,
        createdAt: enrollment.createdAt
      };
    });

    res.json({
      success: true,
      data: {
        scope: 'platform',
        stats: {
          totalRevenue: enrollments.reduce((total, enrollment) => total + (Number(enrollment.amountPaid) || 0), 0),
          totalEnrollments: enrollments.length,
          uniqueLearners: learnerIdentifiers.length,
          totalCourses: await Course.countDocuments()
        },
        courses: [...courseMap.values()].sort((first, second) => second.enrollments - first.enrollments),
        learners: learners.map((learner) => ({
          ...learner,
          enrolledCourses: enrollments.filter((enrollment) => enrollment.studentEmail === learner.emailOrPhone).length
        })),
        records
      }
    });
  } catch (error) {
    console.error('Partner dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch partner dashboard', error: error.message });
  }
});

module.exports = router;
