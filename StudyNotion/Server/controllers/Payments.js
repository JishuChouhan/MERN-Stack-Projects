const { instance } = require("../config/razorPay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/corseEnrollmentEmail");

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  try {
    // Get courseId and userID
    const { course_Id } = req.body;
    const userId = req.user.id;
    // validation
    // valid courseID
    if (!course_Id) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid course ID",
      });
    }
    // valid courseDetails
    let course;
    try {
      course = await Course.findById(course_Id);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      // check user already pay for the same course
      const uid = new mongoose.Types.ObjectId(userId);
      // validation
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "User already enrolled in this course",
        });
      }
    } catch (e) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    // order create
    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      reciept: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_Id,
        userId,
      },
    };
    try {
      // initiate the payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      // return response
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        message: "Payment initiated successfully",
        amount: paymentResponse.amount,
        currency: paymentResponse.currency,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    // return response
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// verify Signature of Razorpay and Seveer
exports.verifySignature = async (req, res) => {
    try{
        const webhookSecret = "12345678";
        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        
        const digest = shasum.digest("hex");
        if(signature === digest){
          console.log("Payment is Authorised");
          
          const {courseId, userId} = req.boy.payload.payment.entity.notes;

          try{
            // fulfill the action
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
              {_id: courseId},
              {$push: {studentEnrolled: userId}},
              {new: true}
            );
            if(!enrolledCourse){
              return res.status(500).json({
                success: false,
                message: "Course not Found"
              })
            }
            console.log(enrolledCourse);

            // find the student and update and add course to list of enrolled courses
            const enrolledStudent = await User.findOneAndUpdate(
              {_id: userId},
              {$push: {courses: courseId}},
              {new: true}
            )
            console.log(enrolledStudent);
            
            // mail send krdo confirmation wala
            const emailResponse = await mailSender(
              enrolledStudent.email,
              "Congrotulation you are Enrolled",
              "Congrats you are onboarded"
            );
            console.log(emailResponse);
            return res.status(200).json({
              success: true,
              message: "Signature Verified"
            })
            
            
          }catch(error){
            console.log(error);
            return res.status(500).json({
              success: false,
              message: error.message
            })
          }
        }
        else{
          return res.status(400).json({
            success: false,
            message: "Invalid reequest"
          })
        }

    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}